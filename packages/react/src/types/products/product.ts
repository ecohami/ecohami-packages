// Local
import { PageInfo, Service } from '..'

export type Product = {
  id: string
  name: string
  manufacturer: string
  createdAt: string
  updatedAt: string
  service: Service
}

export type ProductConnection = {
  products: Product[]
  totalCount: number
}

export type ProductNode = {
  node: Product
}

export type ProductsCursorConnection = {
  edges: ProductNode[]
  totalCount: number
  pageInfo: PageInfo
}
