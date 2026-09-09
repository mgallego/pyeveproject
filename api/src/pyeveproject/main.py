from fastapi import FastAPI

from pyeveproject.status import SystemStatus, get_system_status

app = FastAPI()


@app.get("/api/health")
async def health_check() -> SystemStatus:
    return await get_system_status()


app.frontend("/", directory="static")
