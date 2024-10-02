// Internal
import { PageInfo, Service } from '..'

export type Zone = {
  id: string
  name: string
  location: string
  createdAt: string
  updatedAt: string
  service: Service
  wifiSsid: string
  wifiPassword: string
  mqttUrl: string
  mqttPort: number
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
