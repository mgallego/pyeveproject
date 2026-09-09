from pytest import MonkeyPatch
from respx import Router

from pyeveproject.status import (
    DependencyStatus,
    EsiStatus,
    HealthStatus,
    get_database_status,
    get_esi_status,
    get_system_status,
    load_status,
)


def test_load_status_passes_through_valid_status() -> None:
    status = EsiStatus(status=HealthStatus.OK, players=100)

    result = load_status(status, EsiStatus)

    assert result is status


def test_load_status_converts_exception_to_ko() -> None:
    error = ValueError("boom")

    result = load_status(error, EsiStatus)

    assert result.status == HealthStatus.KO
    assert result.detail == "boom"
    assert isinstance(result, EsiStatus)


async def test_get_esi_status_ok(httpx2_mock: Router) -> None:
    httpx2_mock.get("https://esi.evetech.net/status").respond(
        json={
            "players": 27990,
            "server_version": "1.0",
            "start_time": "2026-01-01T00:00:00Z",
        }
    )

    result = await get_esi_status()

    assert result.status == HealthStatus.OK
    assert result.players == 27990
    assert result.detail is None


async def test_get_esi_status_non_200(httpx2_mock: Router) -> None:
    httpx2_mock.get("https://esi.evetech.net/status").respond(status_code=503)

    result = await get_esi_status()

    assert result.status == HealthStatus.KO
    assert result.detail == "ESI returned 503"
    assert result.players is None


async def test_get_esi_status_missing_players_key(httpx2_mock: Router) -> None:
    httpx2_mock.get("https://esi.evetech.net/status").respond(
        json={"status": "OK", "timeout": 10}
    )

    result = await get_esi_status()

    assert result.status == HealthStatus.OK
    assert result.players is None


async def test_get_database_status_is_ko_not_implemented() -> None:
    result = await get_database_status()

    assert result.status == HealthStatus.KO
    assert result.detail == "Not implemented yet"


async def test_get_system_status_aggregates_all_ok(monkeypatch: MonkeyPatch) -> None:
    async def fake_esi() -> EsiStatus:
        return EsiStatus(status=HealthStatus.OK, players=100)

    async def fake_db() -> DependencyStatus:
        return DependencyStatus(status=HealthStatus.OK)

    monkeypatch.setattr("pyeveproject.status.get_esi_status", fake_esi)
    monkeypatch.setattr("pyeveproject.status.get_database_status", fake_db)

    result = await get_system_status()

    assert result.api.status == HealthStatus.OK
    assert result.esi.status == HealthStatus.OK
    assert result.esi.players == 100
    assert result.database.status == HealthStatus.OK


async def test_get_system_status_survives_esi_failure(monkeypatch: MonkeyPatch) -> None:
    async def failing_esi() -> EsiStatus:
        raise ConnectionError("network unreachable")

    async def fake_db() -> DependencyStatus:
        return DependencyStatus(status=HealthStatus.OK)

    monkeypatch.setattr("pyeveproject.status.get_esi_status", failing_esi)
    monkeypatch.setattr("pyeveproject.status.get_database_status", fake_db)

    result = await get_system_status()

    assert result.api.status == HealthStatus.OK
    assert result.esi.status == HealthStatus.KO
    assert result.esi.detail == "network unreachable"
    assert isinstance(result.esi, EsiStatus)
