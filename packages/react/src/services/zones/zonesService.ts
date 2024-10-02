// External
import { gql } from 'graphql-request'

// Internal
import {
  CreateZoneParams,
  CreateZoneResponse,
  CursorDirection,
  DeleteZoneParams,
  DeleteZoneResponse,
  GetZoneParams,
  GetZonesCursorParams,
  GetZonesParams,
  GraphQLConfig,
  UpdateZoneParams,
  UpdateZoneResponse,
  Zone,
  ZoneConnection,
  ZoneCursorQuery,
  ZoneResponse,
  ZonesCursorConnection,
  ZonesCursorResponse,
  ZonesResponse,
} from '../../types'
import { getGraphQLClient } from '../../lib/graphqlClient'

const createZonesService = (config: GraphQLConfig) => {
  const getZone = async ({ id }: GetZoneParams): Promise<Zone> => {
    const query = gql`
      query zone($id: String!) {
        zone(id: $id) {
          id
          name
          location
          active
          createdAt
          updatedAt
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: ZoneResponse = await graphQLClient.request(query, variables)
    return data.zone
  }

  const getZones = async ({
    pagination,
    filters,
  }: GetZonesParams): Promise<ZoneConnection> => {
    const query = gql`
      query zones($skip: Int!, $take: Int!, $filters: ZonesFilterInput) {
        zones(skip: $skip, take: $take, filters: $filters) {
          zones {
            id
            name
            location
            active
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
    const data: ZonesResponse = await graphQLClient.request(query, variables)
    return data.zones
  }

  const getZonesCursor = async ({
    pagination,
    filters,
  }: GetZonesCursorParams): Promise<ZonesCursorConnection> => {
    const query = gql`
      query zonesCursor(
        $first: Int
        $after: String
        $last: Int
        $before: String
        $filters: ZonesFilterInput
      ) {
        zonesCursor(
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
              location
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

    const variables: ZoneCursorQuery = {
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
    const data: ZonesCursorResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.zonesCursor
  }

  const createZone = async ({ input }: CreateZoneParams): Promise<Zone> => {
    const query = gql`
      mutation createZone($input: CreateZoneInput!) {
        createZone(input: $input) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: CreateZoneResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.createZone
  }

  const updateZone = async ({ input }: UpdateZoneParams): Promise<Zone> => {
    const query = gql`
      mutation updateZone($input: UpdateZoneInput!) {
        updateZone(input: $input) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UpdateZoneResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.updateZone
  }

  const deleteZone = async ({ id }: DeleteZoneParams): Promise<Zone> => {
    const query = gql`
      mutation deleteZone($id: String!) {
        deleteZone(id: $id) {
          id
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: DeleteZoneResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.deleteZone
  }

  return {
    getZones,
    getZonesCursor,
    getZone,
    createZone,
    updateZone,
    deleteZone,
  }
}

export default createZonesService
