// External
import { gql } from 'graphql-request'

// Local
import {
  Device,
  DeviceConnection,
  GetUserDeviceParams,
  GetUserDevicesParams,
  GraphQLConfig,
  UserDeviceResponse,
  UserDevicesResponse,
} from '../../types'
import { getGraphQLClient } from '../../lib/graphqlClient'

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
          macAddress
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
            macAddress
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

  return {
    getUserDevice,
    getUserDevices,
  }
}

export default createUserDevicesService
