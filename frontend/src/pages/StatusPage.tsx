import { useEffect, useState } from 'react'
import type { SystemHealthResponse, DependencyStatus } from '../types/health'
import './StatusPage.css'

const SERVICE_LABELS: Record<keyof SystemHealthResponse, string> = {
  api: 'API',
  esi: 'ESI',
  database: 'Database',
}

function ServiceCard({
  name,
  service,
}: {
  name: string
  service: DependencyStatus
}) {
  const isOk = service.status === 'OK'

  return (
    <div className="status-card">
      <div className="status-card__header">
        <span
          className={`status-card__dot ${isOk ? 'status-card__dot--ok' : 'status-card__dot--ko'}`}
          aria-label={`Status: ${service.status}`}
        />
        <h2 className="status-card__name">{name}</h2>
      </div>
      <p className={`status-card__status ${isOk ? 'status-card__status--ok' : 'status-card__status--ko'}`}>
        {isOk ? 'Operational' : 'Degraded'}
      </p>
      {service.detail && (
        <p className="status-card__detail">{service.detail}</p>
      )}
      {'players' in service && service.players != null && (
        <p className="status-card__players">
          {service.players.toLocaleString()} players
        </p>
      )}
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="status-card status-card--skeleton">
      <div className="status-card__header">
        <span className="status-card__dot status-card__dot--skeleton" />
        <div className="status-card__skeleton-line status-card__skeleton-line--name" />
      </div>
      <div className="status-card__skeleton-line status-card__skeleton-line--status" />
    </div>
  )
}

export default function StatusPage() {
  const [data, setData] = useState<SystemHealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/health')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((json: SystemHealthResponse) => {
        setData(json)
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to retrieve system status')
        setLoading(false)
      })
  }, [])

  return (
    <main className="status-page">
      <h1 className="status-page__title">System Status</h1>

      {loading && (
        <div className="status-grid" aria-busy="true" aria-label="Loading system status">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {error && (
        <div className="status-error" role="alert">
          <p className="status-error__message">{error}</p>
          <p className="status-error__detail">
            The health endpoint may be unreachable. Try refreshing the page.
          </p>
        </div>
      )}

      {data && (
        <div className="status-grid" aria-label="System service status">
          {(Object.keys(SERVICE_LABELS) as Array<keyof SystemHealthResponse>).map(
            (key) => (
              <ServiceCard
                key={key}
                name={SERVICE_LABELS[key]}
                service={data[key]}
              />
            ),
          )}
        </div>
      )}
    </main>
  )
}
