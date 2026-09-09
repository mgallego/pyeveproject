import asyncio
from enum import Enum

import httpx2
from pydantic import BaseModel


class HealthStatus(str, Enum):
    OK = "OK"
    KO = "KO"


class DependencyStatus(BaseModel):
    status: HealthStatus
    detail: str | None = None


class EsiStatus(DependencyStatus):
    players: int | None = None


class SystemStatus(BaseModel):
    api: DependencyStatus
    esi: EsiStatus
    database: DependencyStatus


def load_status[StatusT: DependencyStatus](
    status: StatusT | BaseException, status_cls: type[StatusT]
) -> StatusT:
    if isinstance(status, BaseException):
        return status_cls(status=HealthStatus.KO, detail=str(status))
    return status


async def get_esi_status() -> EsiStatus:
    async with httpx2.AsyncClient() as client:
        r = await client.get("https://esi.evetech.net/status")
    if r.status_code != 200:
        return EsiStatus(status=HealthStatus.KO, detail=f"ESI returned {r.status_code}")

    status_data = r.json()
    players = status_data.get("players")
    return EsiStatus(status=HealthStatus.OK, players=players)


async def get_database_status() -> DependencyStatus:
    return DependencyStatus(status=HealthStatus.KO, detail="Not implemented yet")


async def get_system_status() -> SystemStatus:
    api_status = DependencyStatus(status=HealthStatus.OK)

    database_result, esi_result = await asyncio.gather(
        get_database_status(), get_esi_status(), return_exceptions=True
    )

    return SystemStatus(
        api=api_status,
        esi=load_status(esi_result, EsiStatus),
        database=load_status(database_result, DependencyStatus),
    )
