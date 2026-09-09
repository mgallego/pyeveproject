import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import StatusPage from './StatusPage'
import type { SystemHealthResponse } from '../types/health'

const healthyResponse: SystemHealthResponse = {
  api: { status: 'OK' },
  esi: { status: 'OK', players: 23456 },
  database: { status: 'OK' },
}

const degradedResponse: SystemHealthResponse = {
  api: { status: 'OK' },
  esi: { status: 'KO', detail: 'ESI returned 503' },
  database: { status: 'OK' },
}

describe('StatusPage', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders loading state initially', () => {
    vi.mocked(fetch).mockReturnValue(new Promise(() => {}))
    render(<StatusPage />)
    expect(screen.getByText(/system status/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/loading system status/i)).toBeInTheDocument()
  })

  it('renders service cards on successful fetch', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => healthyResponse,
    } as Response)

    render(<StatusPage />)

    await waitFor(() => {
      expect(screen.getByText(/api/i)).toBeInTheDocument()
      expect(screen.getByText(/esi/i)).toBeInTheDocument()
      expect(screen.getByText(/database/i)).toBeInTheDocument()
    })

    expect(screen.getAllByText(/operational/i)).toHaveLength(3)
  })

  it('renders error state on fetch failure', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

    render(<StatusPage />)

    await waitFor(() => {
      expect(screen.getByText(/unable to retrieve/i)).toBeInTheDocument()
    })
  })

  it('renders error state on non-2xx response', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    } as Response)

    render(<StatusPage />)

    await waitFor(() => {
      expect(screen.getByText(/unable to retrieve/i)).toBeInTheDocument()
    })
  })

  it('displays player count for ESI when present', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => healthyResponse,
    } as Response)

    render(<StatusPage />)

    await waitFor(() => {
      expect(screen.getByText(/23,456/)).toBeInTheDocument()
    })
  })

  it('hides detail text when null', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => healthyResponse,
    } as Response)

    render(<StatusPage />)

    await waitFor(() => {
      expect(screen.getByText(/api/i)).toBeInTheDocument()
    })

    expect(screen.queryByText(/detail/i)).not.toBeInTheDocument()
  })

  it('hides player count when null', async () => {
    const noPlayers: SystemHealthResponse = {
      api: { status: 'OK' },
      esi: { status: 'OK', players: null },
      database: { status: 'OK' },
    }
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => noPlayers,
    } as Response)

    render(<StatusPage />)

    await waitFor(() => {
      expect(screen.getByText(/esi/i)).toBeInTheDocument()
    })

    expect(screen.queryByText(/players/i)).not.toBeInTheDocument()
  })

  it('displays detail text when present', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => degradedResponse,
    } as Response)

    render(<StatusPage />)

    await waitFor(() => {
      expect(screen.getByText(/esi returned 503/i)).toBeInTheDocument()
    })
  })

  it('displays degraded status for KO services', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => degradedResponse,
    } as Response)

    render(<StatusPage />)

    await waitFor(() => {
      expect(screen.getByText(/degraded/i)).toBeInTheDocument()
    })
  })
})
