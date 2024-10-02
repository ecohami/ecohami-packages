// External
import { gql } from 'graphql-request'

// Internal
import {
  DeleteUserParams,
  DeleteUserResponse,
  GetUserParams,
  GetUsersParams,
  GraphQLConfig,
  UpdateUserParams,
  UpdateUserResponse,
  User,
  UserConnection,
  UserResponse,
  UsersResponse,
} from '../types'
import { getGraphQLClient } from '../lib/graphqlClient'

const createUsersService = (config: GraphQLConfig) => {
  const getUser = async ({ id }: GetUserParams): Promise<User> => {
    const query = gql`
      query user($id: String!) {
        user(id: $id) {
          id
          email
          status
          createdAt
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UserResponse = await graphQLClient.request(query, variables)
    return data.user
  }

  const getUsers = async ({
    pagination,
    filters,
  }: GetUsersParams): Promise<UserConnection> => {
    const query = gql`
      query users($skip: Int!, $take: Int!, $filters: UsersFilterInput) {
        users(skip: $skip, take: $take, filters: $filters) {
          users {
            id
            email
            roles
            lang
            theme
            status
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
    const data: UsersResponse = await graphQLClient.request(query, variables)
    return data.users
  }

  const updateUser = async ({ input }: UpdateUserParams): Promise<User> => {
    const query = gql`
      mutation updateUser($id: String!, $data: UpdateUserData!) {
        updateUser(id: $id, data: $data) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UpdateUserResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.updateUser
  }

  const deleteUser = async ({ id }: DeleteUserParams): Promise<User> => {
    const query = gql`
      mutation deleteUser($id: String!) {
        deleteUser(id: $id) {
          id
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: DeleteUserResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.deleteUser
  }

  return {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
  }
}

export default createUsersService
