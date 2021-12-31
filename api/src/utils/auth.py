from src.models.database import User

async def logout_user(local_token: str):
  User.objects(localToken=local_token).modify(**{
    "unset__accessToken": 1,
    "unset__refreshToken": 1,
    "unset__tokenExpiresAt": 1,
    "unset__localToken": 1
  })
