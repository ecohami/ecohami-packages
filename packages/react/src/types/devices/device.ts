// Local
import type { PageInfo, Service } from '..'

export type Device = {
  id: string
  name: string
  deviceId: string
  createdAt: string
  updatedAt: string
  services: Service[]
}

export type DeviceConnection = {
  devices: Device[]
  totalCount: number
}

export type DeviceNode = {
  node: Device
}

export type DevicesCursorConnection = {
  edges: DeviceNode[]
  totalCount: number
  pageInfo: PageInfo
}
