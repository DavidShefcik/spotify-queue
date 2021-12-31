from fastapi import APIRouter, Depends, Request

from src.dependencies.require_auth import require_auth
from src.utils.user import remove_sensitive_user_values

router = APIRouter(prefix="/users")

@router.get("/me", dependencies=[Depends(require_auth)])
async def me(request: Request):
  result = remove_sensitive_user_values(request.state.user)
  
  return result
