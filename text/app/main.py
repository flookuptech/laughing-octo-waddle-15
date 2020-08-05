from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from .routers import api

app = FastAPI()


@app.get("/", response_class=RedirectResponse)
def home():
    """Redirects to docs"""
    return RedirectResponse("/docs")


app.include_router(api.router, prefix='/api', tags=['api'])
