// External
import { gql } from 'graphql-request'

import { getGraphQLClient } from '../../lib/graphqlClient'
// Local
import type {
  CreateUserNodeParams,
  CreateUserNodeResponse,
  DeleteUserNodeParams,
  DeleteUserNodeResponse,
  Node,
  NodeConnection,
  GetUserNodeParams,
  GetUserNodesParams,
  GraphQLConfig,
  UpdateUserNodeParams,
  UpdateUserNodeResponse,
  UserNodeResponse,
  UserNodesResponse,
} from '../../types'

const createUserNodesService = (config: GraphQLConfig) => {
  const getUserNode = async ({ id }: GetUserNodeParams): Promise<Node> => {
    const query = gql`
      query userNode($id: String!) {
        userNode(id: $id) {
          id
          name
          nodeId
          createdAt
          updatedAt
          services {
            id
            name
          }
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UserNodeResponse = await graphQLClient.request(query, variables)
    return data.userNode
  }

  const getUserNodes = async ({
    pagination,
    filters,
  }: GetUserNodesParams): Promise<NodeConnection> => {
    const query = gql`
      query userNodes($skip: Int!, $take: Int!, $filters: NodesFilterInput) {
        userNodes(skip: $skip, take: $take, filters: $filters) {
          nodes {
            id
            name
            nodeId
            createdAt
            updatedAt
            services {
              id
              name
            }
          }
          totalCount
        }
      }
    `

    const { page, take } = pagination
    const variables = {
      skip: (page - 1) * take,
      take,
      filters,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UserNodesResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.userNodes
  }

  const createUserNode = async ({
    input,
  }: CreateUserNodeParams): Promise<Node> => {
    const query = gql`
      mutation createNode($input: CreateNodeInput!) {
        createNode(input: $input) {
          id
          nodeId
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: CreateUserNodeResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.createNode
  }

  const updateUserNode = async ({
    input,
  }: UpdateUserNodeParams): Promise<Node> => {
    const query = gql`
      mutation updateNode($id: String!, $data: UpdateNodeData!) {
        updateNode(id: $id, data: $data) {
          id
          nodeId
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UpdateUserNodeResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.updateNode
  }

  const deleteUserNode = async ({
    id,
  }: DeleteUserNodeParams): Promise<Node> => {
    const query = gql`
      mutation deleteNode($id: String!) {
        deleteNode(id: $id) {
          id
          nodeId
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: DeleteUserNodeResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.deleteNode
  }

  return {
    getUserNode,
    getUserNodes,
    createUserNode,
    updateUserNode,
    deleteUserNode,
  }
}

export default createUserNodesService
