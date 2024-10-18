// External
import { gql } from 'graphql-request'

// Internal
import { getGraphQLClient } from '../lib/graphqlClient'
import {
  Characteristic,
  CharacteristicConnection,
  CharacteristicResponse,
  CharacteristicsResponse,
  CharacteristicsService,
  CreateCharacteristicParams,
  CreateCharacteristicResponse,
  DeleteCharacteristicParams,
  DeleteCharacteristicResponse,
  GetCharacteristicParams,
  GetCharacteristicsParams,
  GraphQLConfig,
  UpdateCharacteristicParams,
  UpdateCharacteristicResponse,
} from '../types'

export const createCharacteristicsService = (
  config: GraphQLConfig,
): CharacteristicsService => {
  const getCharacteristic = async ({
    id,
  }: GetCharacteristicParams): Promise<Characteristic> => {
    const query = gql`
      query characteristic($id: String!) {
        characteristic(id: $id) {
          id
          uuid
          name
          properties
          createdAt
          service {
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
    const data: CharacteristicResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.characteristic
  }

  const getCharacteristics = async ({
    pagination,
    filters,
  }: GetCharacteristicsParams): Promise<CharacteristicConnection> => {
    const query = gql`
      query characteristics(
        $skip: Int!
        $take: Int!
        $filters: CharacteristicsFilterInput
      ) {
        characteristics(skip: $skip, take: $take, filters: $filters) {
          characteristics {
            id
            uuid
            name
            properties
            createdAt
            updatedAt
            service {
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
    const data: CharacteristicsResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.characteristics
  }

  const createCharacteristic = async ({
    input,
  }: CreateCharacteristicParams): Promise<Characteristic> => {
    const query = gql`
      mutation createCharacteristic($input: CreateCharacteristicInput!) {
        createCharacteristic(input: $input) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: CreateCharacteristicResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.createCharacteristic
  }

  const updateCharacteristic = async ({
    input,
  }: UpdateCharacteristicParams): Promise<Characteristic> => {
    const query = gql`
      mutation updateCharacteristic($input: UpdateCharacteristicInput!) {
        updateCharacteristic(input: $input) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UpdateCharacteristicResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.updateCharacteristic
  }

  const deleteCharacteristic = async ({
    id,
  }: DeleteCharacteristicParams): Promise<Characteristic> => {
    const query = gql`
      mutation deleteCharacteristic($id: String!) {
        deleteCharacteristic(id: $id) {
          id
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: DeleteCharacteristicResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.deleteCharacteristic
  }

  return {
    getCharacteristics,
    getCharacteristic,
    createCharacteristic,
    updateCharacteristic,
    deleteCharacteristic,
  }
}
