from pydantic import BaseModel

class LoginResponse(BaseModel):
  oauth_url: str