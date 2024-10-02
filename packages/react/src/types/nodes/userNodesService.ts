// Internal
import type { PaginationOffsetArgs } from '../pagination'
import type { Node, NodeConnection } from './node'
import type { NodesFilter } from './nodesService'

export interface UserNodesService {
  getUserNode(params: GetUserNodeParams): Promise<Node>
  getUserNodes(params: GetUserNodesParams): Promise<NodeConnection>
}

// One
// ------

// Params

export interface GetUserNodeParams {
  id: string
}

// Response

export type UserNodeResponse = {
  userNode: Node
}

// Many
// ------

// Params

export interface GetUserNodesParams {
  pagination: PaginationOffsetArgs
  filters: NodesFilter
}

// Response

export type UserNodesResponse = {
  userNodes: NodeConnection
}

// Create
// ------

// Form

export type CreateUserNodeFormValues = {
  name: string
  nodeId: string
}

// Params

export interface CreateUserNodeParams {
  input: CreateUserNodeInput
}

export type CreateUserNodeInput = {
  name: string
  nodeId: string
  serviceIds: string[]
}

// Response

export type CreateUserNodeResponse = {
  createNode: Node
}

// Update
// ------

// Form

export type UpdateUserNodeFormValues = {
  name: string
  nodeId: string
}

// Params

export interface UpdateUserNodeParams {
  input: UpdateUserNodeInput
}

export type UpdateUserNodeInput = {
  id: string
  name?: string
  nodeId?: string
}

// Response

export type UpdateUserNodeResponse = {
  updateNode: Node
}

// Delete
// ------

// Params

export interface DeleteUserNodeParams {
  id: string
}

// Response

export type DeleteUserNodeResponse = {
  deleteNode: Node
}
