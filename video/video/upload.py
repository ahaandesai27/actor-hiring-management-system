import os 
import dotenv
from .s3 import s3_client

dotenv.load_dotenv()
BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
CLOUDFRONT_DOMAIN = os.getenv('CLOUDFRONT_DOMAIN')

async def upload_video_file(video):
    filename = f"videos/{video.filename}"

    s3_client.upload_fileobj(
        video.file,
        BUCKET_NAME,
        filename,
        ExtraArgs={'ContentType': video.content_type}
    )
    
    video_url = f"https://{CLOUDFRONT_DOMAIN}/{filename}"
    
    return {
        "message": "Video uploaded successfully",
        "video_url": video_url,
        "filename": filename
    }
