import { GraphQLClient } from 'graphql-request'

import { getToken } from './config'
import { GraphQLConfig } from '../types'

let graphQLClient: GraphQLClient | null = null

export const initializeClient = async (config: GraphQLConfig) => {
  graphQLClient = new GraphQLClient(config.url)
  return graphQLClient
}

export const getGraphQLClient = async (config?: GraphQLConfig) => {
  if (!graphQLClient && config) {
    await initializeClient(config)
  }

  if (!graphQLClient) {
    throw new Error('GraphQL Client has not been initialized.')
  }

  const token = await getToken()

  if (token) {
    graphQLClient.setHeader('authorization', `Bearer ${token}`)
  }

  return graphQLClient
}
