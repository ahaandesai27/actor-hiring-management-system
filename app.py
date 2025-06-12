# Updated FastAPI backend
from fastapi import FastAPI, File, UploadFile, Query
from pydantic import BaseModel
import uvicorn

from video.upload_image import upload_video_file
from agent.infer import analyze_video

app = FastAPI()

class VideoRequest(BaseModel):
    url: str

@app.post('/analyze')
async def analyze(request: VideoRequest):
    return await analyze_video(request.url)

@app.post("/upload-video")
async def upload_video(video: UploadFile = File(...)):
    return await upload_video_file(video)


if __name__ == '__main__':
    uvicorn.run(
        "app:app",
        host='127.0.0.1',
        port=8000,
        reload=True,
        log_level='info'
    )