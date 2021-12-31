from pydantic import BaseModel

class LoginCallbackBody(BaseModel):
  code: str