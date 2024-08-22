// Local
import { Characteristic, PageInfo } from '..'

export type Product = {
  id: string
  name: string
  manufacturer: string
  createdAt: string
  updatedAt: string
  characteristics: Characteristic[]
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
