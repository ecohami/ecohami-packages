// Internal
import { PageInfo, Service } from '..'

export enum ZoneStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

export type Zone = {
  id: string
  name: string
  location: string
  createdAt: string
  updatedAt: string
  wifiSsid: string
  wifiPassword: string
  mqttUrl: string
  mqttPort: number
  status: ZoneStatus
  service: Service
}

export type ZoneConnection = {
  zones: Zone[]
  totalCount: number
}

export type ZoneNode = {
  node: Zone
}

export type ZonesCursorConnection = {
  edges: ZoneNode[]
  totalCount: number
  pageInfo: PageInfo
}
