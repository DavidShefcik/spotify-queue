from dotenv import load_dotenv
from fastapi import FastAPI

# Routers
from .routers import auth

# Dotenv
load_dotenv()

# App
app = FastAPI()

app.include_router(auth.router)