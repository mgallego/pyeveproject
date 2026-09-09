export type HealthStatus = 'OK' | 'KO'

export interface DependencyStatus {
  status: HealthStatus
  detail?: string | null
}

export interface EsiStatus extends DependencyStatus {
  players?: number | null
}

export interface SystemHealthResponse {
  api: DependencyStatus
  esi: EsiStatus
  database: DependencyStatus
}
