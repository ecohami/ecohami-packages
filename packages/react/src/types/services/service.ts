// Internal
import { Characteristic, PageInfo } from '..'

export type Service = {
  id: string
  uuid: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  characteristics: Characteristic[]
}

export type ServiceConnection = {
  services: Service[]
  totalCount: number
}

export type ServiceNode = {
  node: Service
}

export type ServicesCursorConnection = {
  edges: ServiceNode[]
  totalCount: number
  pageInfo: PageInfo
}
