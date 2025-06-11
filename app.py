# Updated FastAPI backend
import os
from fastapi import FastAPI, File, UploadFile, Query
import boto3
from dotenv import load_dotenv
import uvicorn
from pydantic import BaseModel

load_dotenv()

from agent.infer import analyze_video

app = FastAPI()

# Configuration
BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
CLOUDFRONT_DOMAIN = os.getenv('CLOUDFRONT_DOMAIN')

s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)

@app.post("/upload-video")
async def upload_video(video: UploadFile = File(...)):
    filename = f"videos/{video.filename}"
    
    # Upload to S3
    s3_client.upload_fileobj(
        video.file,
        BUCKET_NAME,
        filename,
        ExtraArgs={'ContentType': video.content_type}
    )
    
    # Return CloudFront URL (faster for users)
    video_url = f"https://{CLOUDFRONT_DOMAIN}/{filename}"
    
    return {
        "message": "Video uploaded successfully",
        "video_url": video_url,
        "filename": filename
    }

class VideoRequest(BaseModel):
    url: str

@app.post('/analyze')
async def analyze(request: VideoRequest):
    return await analyze_video(request.url)

if __name__ == '__main__':
    uvicorn.run(
        "app:app",
        host='127.0.0.1',
        port=8000,
        reload=True,
        log_level='info'
    )