// Local
import { PageInfo, Service } from '../'

export type Characteristic = {
  id: string
  uuid: string
  name: string
  properties: string
  createdAt: string
  updatedAt: string
  service: Service
}

export type CharacteristicConnection = {
  characteristics: Characteristic[]
  totalCount: number
}

export type CharacteristicNode = {
  node: Characteristic
}

export type CharacteristicsCursorConnection = {
  edges: CharacteristicNode[]
  totalCount: number
  pageInfo: PageInfo
}
