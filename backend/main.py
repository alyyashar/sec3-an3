<<<<<<< HEAD

=======
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def home():
    return {'message': 'Welcome to SEC3 API'}
>>>>>>> 9b2a8ae (Initial commit - FastAPI backend)
