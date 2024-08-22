// External
import { gql } from 'graphql-request'

import { getGraphQLClient } from '../../lib/graphqlClient'
// Local
import type {
  CreateUserDeviceParams,
  CreateUserDeviceResponse,
  DeleteUserDeviceParams,
  DeleteUserDeviceResponse,
  Device,
  DeviceConnection,
  GetUserDeviceParams,
  GetUserDevicesParams,
  GraphQLConfig,
  UpdateUserDeviceParams,
  UpdateUserDeviceResponse,
  UserDeviceResponse,
  UserDevicesResponse,
} from '../../types'

const createUserDevicesService = (config: GraphQLConfig) => {
  const getUserDevice = async ({
    id,
  }: GetUserDeviceParams): Promise<Device> => {
    const query = gql`
      query userDevice($id: String!) {
        userDevice(id: $id) {
          id
          name
          deviceId
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
    const data: UserDeviceResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.userDevice
  }

  const getUserDevices = async ({
    pagination,
    filters,
  }: GetUserDevicesParams): Promise<DeviceConnection> => {
    const query = gql`
      query userDevices(
        $skip: Int!
        $take: Int!
        $filters: DevicesFilterInput
      ) {
        userDevices(skip: $skip, take: $take, filters: $filters) {
          devices {
            id
            name
            deviceId
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
    const data: UserDevicesResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.userDevices
  }

  const createUserDevice = async ({
    input,
  }: CreateUserDeviceParams): Promise<Device> => {
    const query = gql`
      mutation createDevice($input: CreateDeviceInput!) {
        createDevice(input: $input) {
          id
          deviceId
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: CreateUserDeviceResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.createDevice
  }

  const updateUserDevice = async ({
    input,
  }: UpdateUserDeviceParams): Promise<Device> => {
    const query = gql`
      mutation updateDevice($id: String!, $data: UpdateDeviceData!) {
        updateDevice(id: $id, data: $data) {
          id
          deviceId
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UpdateUserDeviceResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.updateDevice
  }

  const deleteUserDevice = async ({
    id,
  }: DeleteUserDeviceParams): Promise<Device> => {
    const query = gql`
      mutation deleteDevice($id: String!) {
        deleteDevice(id: $id) {
          id
          deviceId
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: DeleteUserDeviceResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.deleteDevice
  }

  return {
    getUserDevice,
    getUserDevices,
    createUserDevice,
    updateUserDevice,
    deleteUserDevice,
  }
}

export default createUserDevicesService
