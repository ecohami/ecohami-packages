// Internal
import type {
  Node,
  NodeConnection,
  NodesCursorConnection,
  PaginationCursorArgs,
  PaginationOffsetArgs,
} from '..'

export interface NodesService {
  getNode(params: GetNodeParams): Promise<Node>
  getNodes(params: GetNodesParams): Promise<NodeConnection>
  getNodesCursor(params: GetNodesCursorParams): Promise<NodesCursorConnection>
  createNode(params: CreateNodeParams): Promise<Node>
  updateNode(params: UpdateNodeParams): Promise<Node>
  deleteNode(params: DeleteNodeParams): Promise<Node>
}

// One
// ------

// Params

export interface GetNodeParams {
  id: string
}

// Response

export type NodeResponse = {
  node: Node
}

// Many
// ------

// Params

export interface GetNodesParams {
  pagination: PaginationOffsetArgs
  filters: NodesFilter
}

export interface GetNodesCursorParams {
  pagination: PaginationCursorArgs
  filters: NodesFilter
}

// Query

export type NodesFilter = {
  keyword?: string
  active?: boolean
}

export type NodeCursorQuery = {
  first?: number | null
  after?: string | null
  last?: number | null
  before?: string | null
  filters: NodesFilter
}

// Response

export type NodesResponse = {
  nodes: NodeConnection
}

export type NodesCursorResponse = {
  nodesCursor: NodesCursorConnection
}

// Create
// ------

// Form

export type CreateNodeFormValues = {
  name: string
  nodeId: string
}

// Params

export interface CreateNodeParams {
  input: CreateNodeInput
}

export type CreateNodeInput = {
  name: string
  nodeId: string
  serviceIds: string[]
}

// Response

export type CreateNodeResponse = {
  createNode: Node
}

// Update
// ------

// Form

export type UpdateNodeFormValues = {
  name: string
  nodeId: string
}

// Params

export interface UpdateNodeParams {
  input: UpdateNodeInput
}

export type UpdateNodeInput = {
  id: string
  name?: string
  nodeId?: string
}

// Response

export type UpdateNodeResponse = {
  updateNode: Node
}

// Delete
// ------

// Params

export interface DeleteNodeParams {
  id: string
}

// Response

export type DeleteNodeResponse = {
  deleteNode: Node
}
