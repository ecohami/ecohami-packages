// External
import { gql } from 'graphql-request'

import { getGraphQLClient } from '../../lib/graphqlClient'
// Internal
import {
  type CreateNodeParams,
  type CreateNodeResponse,
  CursorDirection,
  type DeleteNodeParams,
  type DeleteNodeResponse,
  type Node,
  type NodeConnection,
  type NodeCursorQuery,
  type NodeResponse,
  type NodesCursorConnection,
  type NodesCursorResponse,
  type NodesResponse,
  type NodesService,
  type GetNodeParams,
  type GetNodesCursorParams,
  type GetNodesParams,
  type GraphQLConfig,
  type UpdateNodeParams,
  type UpdateNodeResponse,
} from '../../types'

const createNodesService = (config: GraphQLConfig): NodesService => {
  const getNode = async ({ id }: GetNodeParams): Promise<Node> => {
    const query = gql`
      query node($id: String!) {
        node(id: $id) {
          id
          name
          nodeId
          createdAt
          updatedAt
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: NodeResponse = await graphQLClient.request(query, variables)
    return data.node
  }

  const getNodes = async ({
    pagination,
    filters,
  }: GetNodesParams): Promise<NodeConnection> => {
    const query = gql`
      query nodes($skip: Int!, $take: Int!, $filters: NodesFilterInput) {
        nodes(skip: $skip, take: $take, filters: $filters) {
          nodes {
            id
            name
            nodeId
            createdAt
            user {
              id
              email
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
    const data: NodesResponse = await graphQLClient.request(query, variables)
    return data.nodes
  }

  const getNodesCursor = async ({
    pagination,
    filters,
  }: GetNodesCursorParams): Promise<NodesCursorConnection> => {
    const query = gql`
      query nodesCursor(
        $first: Int
        $after: String
        $last: Int
        $before: String
        $filters: NodesFilterInput
      ) {
        nodesCursor(
          first: $first
          after: $after
          last: $last
          before: $before
          filters: $filters
        ) {
          totalCount
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              name
              nodeId
              createdAt
              user {
                id
                email
                name
              }
            }
          }
        }
      }
    `

    const variables: NodeCursorQuery = {
      first: null,
      after: null,
      last: null,
      before: null,
      filters,
    }

    const { take, direction, cursor } = pagination
    if (direction === CursorDirection.NEXT) {
      variables.first = take
      variables.after = cursor
    } else {
      variables.last = take
      variables.before = cursor
    }

    const graphQLClient = await getGraphQLClient()
    const data: NodesCursorResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.nodesCursor
  }

  const createNode = async ({ input }: CreateNodeParams): Promise<Node> => {
    const query = gql`
      mutation createNode($input: CreateNodeInput!) {
        createNode(input: $input) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: CreateNodeResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.createNode
  }

  const updateNode = async ({ input }: UpdateNodeParams): Promise<Node> => {
    const query = gql`
      mutation updateNode($id: String!, $data: UpdateNodeData!) {
        updateNode(id: $id, data: $data) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UpdateNodeResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.updateNode
  }

  const deleteNode = async ({ id }: DeleteNodeParams): Promise<Node> => {
    const query = gql`
      mutation deleteNode($id: String!) {
        deleteNode(id: $id) {
          id
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: DeleteNodeResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.deleteNode
  }

  return {
    getNodes,
    getNodesCursor,
    getNode,
    createNode,
    updateNode,
    deleteNode,
  }
}

export default createNodesService
