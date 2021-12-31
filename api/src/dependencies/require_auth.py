from typing import Optional
from fastapi import Request, Header, Cookie, HTTPException

from src.models.database import User
from src.constants.errors import ERROR_MESSAGES
from src.utils.user import database_user_to_json

async def require_auth(request: Request, authorization: Optional[str] = Header(None), token: Optional[str] = Cookie(None)):
  user = await check_auth(authorization, token)

  request.state.user = user

  return user

async def check_auth(auth_header: str, token_cookie: str):
  auth = None

  if auth_header == None and token_cookie == None:
    raise HTTPException(status_code=401, detail=ERROR_MESSAGES['unauthorized'])
  elif auth_header:
    auth = auth_header
  elif token_cookie:
    auth = token_cookie
  
  if auth == None:
    raise HTTPException(status_code=401, detail=ERROR_MESSAGES['unauthorized'])

  split_authorization = auth.split()
  if len(split_authorization) == 0:
    raise HTTPException(status_code=401, detail=ERROR_MESSAGES['unauthorized'])

  token = split_authorization[-1]

  # Get user from database
  user = None

  try:
    user = User.objects.get(localToken=token)
  except:
    raise HTTPException(status_code=401, detail=ERROR_MESSAGES['unauthorized'])

  user_as_json = database_user_to_json(user)

  return user_as_json