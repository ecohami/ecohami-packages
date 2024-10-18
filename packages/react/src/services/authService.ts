// External
import { gql } from 'graphql-request'
import { signOut } from 'next-auth/react'

// Internal
import { getGraphQLClient } from '../lib/graphqlClient'
import {
  AuthService,
  GraphQLConfig,
  RefreshTokenParams,
  RefreshTokenResponse,
  Token,
} from '../types'

export const createAuthService = (config: GraphQLConfig): AuthService => {
  const refreshToken = async ({
    refreshToken,
  }: RefreshTokenParams): Promise<Token> => {
    const query = gql`
      mutation refreshToken($refreshToken: JWT!) {
        refreshToken(token: $refreshToken) {
          accessToken
          accessTokenExp
          refreshToken
        }
      }
    `

    const variables = {
      refreshToken,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: RefreshTokenResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.refreshToken
  }

  const federatedLogout = async (): Promise<void> => {
    try {
      const response = await fetch('/api/auth/federated-logout')
      const data = await response.json()
      if (response.ok) {
        await signOut({ redirect: true })
        window.location.href = data.url.replace('auth', 'signin')
        return
      }
      throw new Error(data.error)
    } catch (error) {
      console.error(error)
      alert(error)
      await signOut({ redirect: true })
      window.location.href = '/'
    }
  }

  return {
    refreshToken,
    federatedLogout,
  }
}
