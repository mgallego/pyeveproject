from collections.abc import Generator
from typing import Any

import pytest
from fastapi.testclient import TestClient

from pyeveproject.main import app


@pytest.fixture()
def client() -> Generator[TestClient]:
    with TestClient(app) as c:
        yield c


def test_health_check(client: TestClient, monkeypatch: pytest.MonkeyPatch) -> None:
    async def fake_system_status() -> Any:
        return {
            "api": {"status": "OK", "detail": None},
            "esi": {"status": "OK", "detail": None, "players": 100},
            "database": {"status": "KO", "detail": "Not implemented yet"},
        }

    monkeypatch.setattr("pyeveproject.main.get_system_status", fake_system_status)
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {
        "api": {"status": "OK", "detail": None},
        "esi": {"status": "OK", "detail": None, "players": 100},
        "database": {"status": "KO", "detail": "Not implemented yet"},
    }
