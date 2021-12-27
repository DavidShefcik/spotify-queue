import sys, os
from dotenv import load_dotenv
from fastapi import FastAPI
from mongoengine import connect

# Routers
from .routers import auth

# Dotenv
load_dotenv()

# App
app = FastAPI()

@app.on_event("startup")
async def startup_event():
# Connect to mongoDB
  try:
    print("Connecting to MongoDB...")
    connect(host=os.getenv("DATABASE_URL"))
    print("Successfully connected to MongoDB!")
  except Exception as error:
    print(f"Failed to connect to MongoDB! Error: {error}")
    sys.exit(1)

app.include_router(auth.router)