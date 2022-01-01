import requests, os
from datetime import datetime, timedelta

from .strings import encode_uri_component, convert_to_base64
from src.exceptions.spotify_api import SpotifyOAuthError, SpotifyAPIError

# streaming to control streaming of music. User must have Spotify premium
# user-read-private to determine the subscription type of the user
# user-library-modify for users to save a song to their liked music playlist
# user-read-playback-state to get the info of the current playback status
# user-modify-playback-state to modify the user's playback status
SPOTIFY_OAUTH_SCOPES = ['streaming', 'user-read-private', 'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state']
SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1"

async def refresh_spotify_token(refresh_token: str):
  return await spotify_token_api(token=refresh_token, token_type='refresh')

async def request_spotify_token(code: str):
  return await spotify_token_api(token=code, token_type='access')

def generate_oauth_url():
  client_id = encode_uri_component(os.getenv('SPOTIFY_CLIENT_ID'))
  scope = encode_uri_component(' '.join(SPOTIFY_OAUTH_SCOPES))
  redirect_uri = encode_uri_component(os.getenv('SPOTIFY_REDIRECT_URI'))

  return f"https://accounts.spotify.com/authorize?response_type=code&client_id={client_id}&scope={scope}&redirect_uri={redirect_uri}"

async def spotify_token_api(token: str, token_type: str):
  client_authorization_header = os.getenv('SPOTIFY_CLIENT_ID') + ':' + os.getenv('SPOTIFY_CLIENT_SECRET')
  encoded_client_authorization_header = convert_to_base64(client_authorization_header)

  data = {}

  if token_type == 'access':
    data = {
      "code": token,
      "redirect_uri": os.getenv("SPOTIFY_REDIRECT_URI"),
      "grant_type": "authorization_code"
    }
  elif token_type == 'refresh':
    data = {
      "grant_type": "refresh_token",
      "refresh_token": token
    }
  else:
    raise Exception('invalid_token')
  
  try:
    res = requests.post("https://accounts.spotify.com/api/token", data=data, headers={
      "Authorization": f"Basic {encoded_client_authorization_header}",
      "Content-Type": "application/x-www-form-urlencoded",
    })

    res_as_json = res.json()

    if 'error' in res_as_json:
      raise SpotifyOAuthError(res_as_json['error_description'])
    
    access_token = res_as_json['access_token']
    expires_in = res_as_json['expires_in']

    now_in_utc = datetime.utcnow()
    time_plus_expires = timedelta(seconds=expires_in)

    token_expires_at = now_in_utc + time_plus_expires

    result = {
      "access_token": access_token,
      "expires_at": token_expires_at
    }

    # access gets the initial auth code so it returns a refresh token
    if token_type == 'access':
      result['refresh_token'] = res_as_json['refresh_token']

    return result
  except Exception as error:
    raise error

async def spotify_api_request(*args, url=str, access_token=str, method='get'):
  try:
    req = requests.request(url=f"{SPOTIFY_API_BASE_URL}{url}", method=method, headers={
      "Authorization": f"Bearer {access_token}"
    })
    req_as_json = req.json()

    return req_as_json
  except Exception as error:
    raise SpotifyAPIError(error)

async def get_current_spotify_user(access_token: str):
  spotify_user_data = await spotify_api_request(url='/me', access_token=access_token)

  return spotify_user_data