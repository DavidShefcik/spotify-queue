from fastapi import APIRouter

from src.models.responses.auth import LoginResponse

router = APIRouter(prefix="/auth")

@router.get("/login", response_model=LoginResponse)
async def login():
  return LoginResponse(oauth_url="test")

@router.get("/login/callback")
async def login_callback():
  return "login callback"

@router.get("/logout")
async def logout():
  return "logout"