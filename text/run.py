import uvicorn
# don't delete the import below
import app

if __name__ == '__main__':
    # Development
    uvicorn.run("app.main:app", host='127.0.0.1', port=8000, reload=True)
    # Production
    # uvicorn.run("run:app", host='127.0.0.1', port=8000, workers=2)
