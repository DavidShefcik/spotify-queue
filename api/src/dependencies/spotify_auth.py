import json
from typing import Optional
from fastapi import Request, Header, Cookie, HTTPException
from datetime import datetime

from .require_auth import check_auth
from src.models.database import User
from src.utils.spotify_api import refresh_spotify_token
from src.exceptions.spotify_api import SpotifyOAuthError
from src.constants.errors import ERROR_MESSAGES
from src.utils.user import database_user_to_json

FIVE_MINUTES_IN_SECONDS = 60 * 5

async def spotify_auth(request: Request, authorization: Optional[str] = Header(None), token: Optional[str] = Cookie(None)):
  user = await check_auth(authorization, token)
  
  spotifyId = user['spotifyId']
  token_expires_at = user['tokenExpiresAt']
  refresh_token = user['refreshToken']

  # Refresh access token if token is going to expire within five minutes
  tokenExpiresAt = datetime.utcfromtimestamp(token_expires_at / 1000)
  now = datetime.utcnow()
  difference = tokenExpiresAt - now
  difference_total_seconds = difference.total_seconds()

  if difference_total_seconds <= FIVE_MINUTES_IN_SECONDS:
    try:
      spotify_token_data = await refresh_spotify_token(refresh_token)

      access_token = spotify_token_data['access_token']
      expires_at = spotify_token_data['expires_at']

      new_user = User.objects(spotifyId=spotifyId).modify(new=True, **{
        "accessToken": access_token,
        "tokenExpiresAt": expires_at
      })
      user = database_user_to_json(new_user)
    except Exception as error:
      if isinstance(error, SpotifyOAuthError):
        raise HTTPException(status_code=400, detail=ERROR_MESSAGES['spotify_oauth_error'])
      else:
        raise HTTPException(status_code=500, detail=ERROR_MESSAGES['internal_server_error'])

  request.state.user = user
  
  return user