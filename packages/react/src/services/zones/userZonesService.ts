// External
import { gql } from 'graphql-request'

// Local
import {
  GetUserZoneParams,
  GetUserZonesParams,
  GraphQLConfig,
  UserZoneResponse,
  UserZonesResponse,
  Zone,
  ZoneConnection,
} from '../../types'
import { getGraphQLClient } from '../../lib/graphqlClient'

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
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    console.log('xo1')
    const data: UserZoneResponse = await graphQLClient.request(query, variables)
    console.log('xo2')
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

  return {
    getUserZone,
    getUserZones,
  }
}

export default createUserZonesService
