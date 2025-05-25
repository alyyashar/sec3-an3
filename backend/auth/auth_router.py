from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer
from db import schemas
from auth.supabase_client import supabase
from auth.auth_utils import validate_supabase_token

import os

router = APIRouter(prefix="/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


# ──────────────────────────────────────────────
# Register AN3 external users via Supabase
# ──────────────────────────────────────────────
@router.post("/register", response_model=schemas.UserOut, status_code=201)
def register(user: schemas.UserCreate):
    res = supabase.auth.sign_up({
        "email": user.email,
        "password": user.password,
    })
    if res.get("error"):
        raise HTTPException(status_code=400, detail=res["error"]["message"])

    u = res["data"]["user"]
    return schemas.UserOut(id=u["id"], email=u["email"])


# ──────────────────────────────────────────────
# Login AN3 users via Supabase Email/Password
# ──────────────────────────────────────────────
@router.post("/token", response_model=schemas.Token)
def login(user: schemas.UserCreate):
    res = supabase.auth.sign_in({
        "email": user.email,
        "password": user.password,
    })

    session = res.get("data", {}).get("session")
    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {
        "access_token": session["access_token"],
        "token_type": "bearer",
        "refresh_token": session["refresh_token"]
    }


# ──────────────────────────────────────────────
# Get current AN3 user from Supabase JWT
# ──────────────────────────────────────────────
def get_current_user(token: str = Depends(oauth2_scheme)):
    return validate_supabase_token(token)


@router.get("/me", response_model=schemas.UserOut)
def me(user=Depends(get_current_user)):
    return schemas.UserOut(id=user["sub"], email=user["email"])


# ──────────────────────────────────────────────
# Redirect to Supabase OAuth (Google, GitHub, etc.)
# ──────────────────────────────────────────────
@router.get("/oauth/{provider}")
def oauth_redirect(provider: str):
    url = supabase.auth.api.get_authorize_url(
        provider=provider,
        redirect_to=os.getenv("OAUTH_REDIRECT")
    )
    return RedirectResponse(url)


# ──────────────────────────────────────────────
# Handle Supabase OAuth callback
# ──────────────────────────────────────────────
@router.get("/callback")
def oauth_callback(code: str):
    res = supabase.auth.exchange_oauth_for_token({
        "code": code,
        "provider": "google",  # you can also dynamically detect this
    })

    if res.get("error"):
        raise HTTPException(400, res["error"]["message"])

    return res["data"]


# ──────────────────────────────────────────────
# Test endpoint (keep it)
# ──────────────────────────────────────────────
@router.get("/test")
def test_api():
    return {"message": "Auth API is working"}
