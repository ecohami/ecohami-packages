// Local
import type { Characteristic, PageInfo } from '..'

export type Node = {
  id: string
  name: string
  nodeId: string
  createdAt: string
  updatedAt: string
  characteristics: Characteristic[]
}

export type NodeConnection = {
  nodes: Node[]
  totalCount: number
}

export type NodeNode = {
  node: Node
}

export type NodesCursorConnection = {
  edges: NodeNode[]
  totalCount: number
  pageInfo: PageInfo
}
