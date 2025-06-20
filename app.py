# Updated FastAPI backend
from fastapi import FastAPI, File, UploadFile, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from video.upload import upload_video_file
from agent.infer import analyze_video

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

class VideoRequest(BaseModel):
    url: str

@app.post('/analyze')
async def analyze(request: VideoRequest):
    return await analyze_video(request.url)

@app.post("/upload-video")
async def upload_video(video: UploadFile = File(...)):
    return await upload_video_file(video)

@app.get("/health")
def health():
    return "Server is running..."


if __name__ == '__main__':
    uvicorn.run(
        "app:app",
        host='127.0.0.1',
        port=8000,
        reload=True,
        log_level='info'
    )