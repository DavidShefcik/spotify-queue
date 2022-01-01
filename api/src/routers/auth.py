import os
from fastapi import APIRouter, HTTPException, Depends, Request, Response
from uuid import uuid4

from src.dependencies.require_auth import require_auth
from src.dependencies.spotify_auth import spotify_auth
from src.models.responses.auth import LoginResponse, LoginCallbackResponse, CheckAuthResponse, LogoutResponse
from src.models.bodies.auth import LoginCallbackBody
from src.models.database import User 
from src.utils.spotify_api import generate_oauth_url, request_spotify_token, get_current_spotify_user
from src.utils.user import remove_sensitive_database_user_values, remove_sensitive_user_values
from src.utils.auth import logout_user
from src.exceptions.spotify_api import SpotifyOAuthError, SpotifyAPIError
from src.constants.errors import ERROR_MESSAGES

SECONDS_PER_DAY = (60 * 60) * 24
THIRTY_DAYS_IN_SECONDS = SECONDS_PER_DAY * 30

router = APIRouter(prefix="/auth")

@router.get("/login", response_model=LoginResponse)
async def login():
  oauth_url = generate_oauth_url()

  return LoginResponse(oauth_url=oauth_url)

@router.post("/login/callback", response_model=LoginCallbackResponse)
async def login_callback(body: LoginCallbackBody, response: Response):
  code = body.code

  new_user = None
  
  try:
    spotify_token_data = await request_spotify_token(code)

    access_token = spotify_token_data['access_token']
    refresh_token = spotify_token_data['refresh_token']
    expires_at = spotify_token_data['expires_at']

    spotify_user_data = await get_current_spotify_user(access_token)

    username = spotify_user_data['display_name']
    spotifyId = spotify_user_data['id']
    spotifyPremium = spotify_user_data['product']

    userHasSpotifyPremium = False
    if spotifyPremium == 'premium':
      userHasSpotifyPremium = True

    # Upsert user
    new_user = User.objects(spotifyId=spotifyId).modify(upsert=True, new=True, **{
      "username": username,
      "spotifyId": spotifyId,
      "hasSpotifyPremium": userHasSpotifyPremium,
      "accessToken": access_token,
      "refreshToken": refresh_token,
      "tokenExpiresAt": expires_at,
      "localToken": uuid4().hex
    })
  except Exception as error:
    if isinstance(error, SpotifyOAuthError):
      raise HTTPException(status_code=400, detail=ERROR_MESSAGES['spotify_oauth_error'])
    elif isinstance(error, SpotifyAPIError):
      raise HTTPException(status_code=400, detail=ERROR_MESSAGES['spotify_api_error'])
    else:
      raise HTTPException(status_code=500, detail=ERROR_MESSAGES['internal_server_error'])

  new_user_as_json = remove_sensitive_database_user_values(new_user, remove_local_token=False)

  response.set_cookie(key="token", value=new_user["localToken"], domain=os.getenv("COOKIE_DOMAIN"), secure=True, httponly=True, expires=THIRTY_DAYS_IN_SECONDS)

  return new_user_as_json

@router.get("/check", dependencies=[Depends(spotify_auth)], response_model=CheckAuthResponse)
async def check(request: Request):
  user_data = request.state.user

  result = remove_sensitive_user_values(user_data, remove_local_token=True)

  return result

@router.post("/logout", dependencies=[Depends(require_auth)], response_model=LogoutResponse)
async def logout(request: Request, response: Response):
  user_data = request.state.user
  local_token = user_data['localToken']

  try:
    await logout_user(local_token)
  except:
    raise HTTPException(status_code=500, detail=ERROR_MESSAGES['internal_server_error'])
  
  res = Response(status_code=200)

  res.delete_cookie(key="token", domain=os.getenv("COOKIE_DOMAIN"))

  return res