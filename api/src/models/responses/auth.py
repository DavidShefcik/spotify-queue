from pydantic import BaseModel

class LoginResponse(BaseModel):
  oauth_url: str

class SanitizedUserDataWithoutToken(BaseModel):
  _id: str
  username: str
  spotifyId: str
  hasSpotifyPremium: str

class SanitizedUserDataWithToken(SanitizedUserDataWithoutToken):
  localToken: str

class LoginCallbackResponse(SanitizedUserDataWithToken):
  pass

class CheckAuthResponse(SanitizedUserDataWithoutToken):
  pass

class LogoutResponse(BaseModel):
  pass