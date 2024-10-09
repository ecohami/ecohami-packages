// External
import { gql } from 'graphql-request'

import { getGraphQLClient } from '../../lib/graphqlClient'
// Internal
import {
  CreateUserZoneParams,
  CreateUserZoneResponse,
  DeleteUserZoneParams,
  DeleteUserZoneResponse,
  GetUserZoneParams,
  GetUserZonesParams,
  GraphQLConfig,
  UpdateUserZoneParams,
  UpdateUserZoneResponse,
  UserZoneResponse,
  UserZonesResponse,
  Zone,
  ZoneConnection,
} from '../../types'

const createUserZonesService = (config: GraphQLConfig) => {
  const getUserZone = async ({ id }: GetUserZoneParams): Promise<Zone> => {
    const query = gql`
      query userZone($id: String!) {
        userZone(id: $id) {
          id
          name
          location
          createdAt
          updatedAt
          wifiSsid
          wifiPassword
          mqttUrl
          mqttPort
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UserZoneResponse = await graphQLClient.request(query, variables)
    return data.userZone
  }

  const getUserZones = async ({
    pagination,
    filters,
  }: GetUserZonesParams): Promise<ZoneConnection> => {
    const query = gql`
      query userZones($skip: Int!, $take: Int!, $filters: ZonesFilterInput) {
        userZones(skip: $skip, take: $take, filters: $filters) {
          zones {
            id
            name
            location
            createdAt
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
    const data: UserZonesResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.userZones
  }

  const createUserZone = async ({
    input,
  }: CreateUserZoneParams): Promise<Zone> => {
    const query = gql`
      mutation createUserZone($input: CreateUserZoneInput!) {
        createUserZone(input: $input) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: CreateUserZoneResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.createUserZone
  }

  const updateUserZone = async ({
    input,
  }: UpdateUserZoneParams): Promise<Zone> => {
    const query = gql`
      mutation updateUserZone($input: UpdateUserZoneInput!) {
        updateUserZone(input: $input) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UpdateUserZoneResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.updateUserZone
  }

  const deleteUserZone = async ({
    id,
  }: DeleteUserZoneParams): Promise<Zone> => {
    const query = gql`
      mutation deleteUserZone($id: String!) {
        deleteUserZone(id: $id) {
          id
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: DeleteUserZoneResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.deleteZone
  }

  return {
    getUserZone,
    getUserZones,
    createUserZone,
    updateUserZone,
    deleteUserZone,
  }
}

export default createUserZonesService
