// External
import { gql } from 'graphql-request'

// Internal
import { getGraphQLClient } from '../lib/graphqlClient'
import {
  CreateServiceParams,
  CreateServiceResponse,
  DeleteServiceParams,
  DeleteServiceResponse,
  GetServiceParams,
  GetServicesParams,
  GraphQLConfig,
  Service,
  ServiceConnection,
  ServiceResponse,
  ServicesResponse,
  UpdateServiceParams,
  UpdateServiceResponse,
} from '../types'

export const createServicesService = (config: GraphQLConfig) => {
  const getService = async ({ id }: GetServiceParams): Promise<Service> => {
    const query = gql`
      query service($id: String!) {
        service(id: $id) {
          id
          uuid
          name
          description
          createdAt
          updatedAt
          characteristics {
            id
            uuid
            name
            createdAt
            updatedAt
          }
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: ServiceResponse = await graphQLClient.request(query, variables)
    return data.service
  }

  const getServices = async ({
    pagination,
    filters,
  }: GetServicesParams): Promise<ServiceConnection> => {
    const query = gql`
      query services($skip: Int!, $take: Int!, $filters: ServicesFilterInput) {
        services(skip: $skip, take: $take, filters: $filters) {
          services {
            id
            uuid
            name
            description
            createdAt
            updatedAt
            characteristics {
              id
              uuid
              name
              createdAt
              updatedAt
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
    const data: ServicesResponse = await graphQLClient.request(query, variables)
    return data.services
  }

  const createService = async ({
    input,
  }: CreateServiceParams): Promise<Service> => {
    const query = gql`
      mutation createService($data: CreateServiceInput!) {
        createService(data: $data) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: CreateServiceResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.createService
  }

  const updateService = async ({
    input,
  }: UpdateServiceParams): Promise<Service> => {
    const query = gql`
      mutation updateService($input: UpdateServiceInput!) {
        updateService(input: $input) {
          id
        }
      }
    `

    const variables = { input }

    const graphQLClient = await getGraphQLClient(config)
    const data: UpdateServiceResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.updateService
  }

  const deleteService = async ({
    id,
  }: DeleteServiceParams): Promise<Service> => {
    const query = gql`
      mutation deleteService($id: String!) {
        deleteService(id: $id) {
          id
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: DeleteServiceResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.deleteService
  }

  return {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
  }
}
