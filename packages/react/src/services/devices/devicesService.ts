// External
import { gql } from 'graphql-request'

import { getGraphQLClient } from '../../lib/graphqlClient'
// Local
import {
  type CreateDeviceParams,
  type CreateDeviceResponse,
  CursorDirection,
  type DeleteDeviceParams,
  type DeleteDeviceResponse,
  type Device,
  type DeviceConnection,
  type DeviceCursorQuery,
  type DeviceResponse,
  type DevicesCursorConnection,
  type DevicesCursorResponse,
  type DevicesResponse,
  type DevicesService,
  type GetDeviceParams,
  type GetDevicesCursorParams,
  type GetDevicesParams,
  type GraphQLConfig,
  type UpdateDeviceParams,
  type UpdateDeviceResponse,
} from '../../types'

const createDevicesService = (config: GraphQLConfig): DevicesService => {
  const getDevice = async ({ id }: GetDeviceParams): Promise<Device> => {
    const query = gql`
      query device($id: String!) {
        device(id: $id) {
          id
          name
          deviceId
          createdAt
          updatedAt
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: DeviceResponse = await graphQLClient.request(query, variables)
    return data.device
  }

  const getDevices = async ({
    pagination,
    filters,
  }: GetDevicesParams): Promise<DeviceConnection> => {
    const query = gql`
      query devices($skip: Int!, $take: Int!, $filters: DevicesFilterInput) {
        devices(skip: $skip, take: $take, filters: $filters) {
          devices {
            id
            name
            deviceId
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
    const data: DevicesResponse = await graphQLClient.request(query, variables)
    return data.devices
  }

  const getDevicesCursor = async ({
    pagination,
    filters,
  }: GetDevicesCursorParams): Promise<DevicesCursorConnection> => {
    const query = gql`
      query devicesCursor(
        $first: Int
        $after: String
        $last: Int
        $before: String
        $filters: DevicesFilterInput
      ) {
        devicesCursor(
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
              deviceId
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

    const variables: DeviceCursorQuery = {
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
    const data: DevicesCursorResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.devicesCursor
  }

  const createDevice = async ({
    input,
  }: CreateDeviceParams): Promise<Device> => {
    const query = gql`
      mutation createDevice($input: CreateDeviceInput!) {
        createDevice(input: $input) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: CreateDeviceResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.createDevice
  }

  const updateDevice = async ({
    input,
  }: UpdateDeviceParams): Promise<Device> => {
    const query = gql`
      mutation updateDevice($id: String!, $data: UpdateDeviceData!) {
        updateDevice(id: $id, data: $data) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UpdateDeviceResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.updateDevice
  }

  const deleteDevice = async ({ id }: DeleteDeviceParams): Promise<Device> => {
    const query = gql`
      mutation deleteDevice($id: String!) {
        deleteDevice(id: $id) {
          id
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: DeleteDeviceResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.deleteDevice
  }

  return {
    getDevices,
    getDevicesCursor,
    getDevice,
    createDevice,
    updateDevice,
    deleteDevice,
  }
}

export default createDevicesService
