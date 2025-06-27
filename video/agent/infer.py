# agno_module/video_analyzer.py
from .agent import agent
from agno.media import Video
from .agent import run_agent
import httpx  
import traceback

async def read_video_bytes_from_url(url: str) -> bytes:
    timeout = httpx.Timeout(60.0)
    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.get(url)
        if response.status_code == 200:
            return response.content
        else:
            raise Exception(f"Failed to fetch video. Status code: {response.status_code}")

async def analyze_video(url: str):
    try:
        video_bytes = await read_video_bytes_from_url(url)
        video = Video(content=video_bytes)
        response = run_agent(video)
        return {"analysis": response}
    except Exception as e:
        traceback.print_exc()
        return {"error": str(e)}