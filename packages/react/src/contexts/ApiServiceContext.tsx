import React, { createContext, useContext, ReactNode, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import {
  createAuthService,
  createCharacteristicsService,
  createNodesService,
  createProductsService,
  createServicesService,
  createUserNodesService,
  createUsersService,
  createUserZonesService,
  createZonesService,
} from '../services'
import {
  AuthService,
  CharacteristicsService,
  NodesService,
  GraphQLConfig,
  ProductsService,
  ServicesService,
  UserNodesService,
  UsersService,
  UserZonesService,
  ZonesService,
} from '../types'
import { setGetTokenFunction } from '../lib/config'

interface ApiServices {
  authService: AuthService
  nodesService: NodesService
  userNodesService: UserNodesService
  characteristicsService: CharacteristicsService
  productsService: ProductsService
  servicesService: ServicesService
  usersService: UsersService
  userZonesService: UserZonesService
  zonesService: ZonesService
}

interface ServicesProviderProps {
  children: ReactNode
  config: GraphQLConfig
  getToken: () => Promise<string | null>
  queryClient: QueryClient
}

const ApiServicesContext = createContext<ApiServices | undefined>(undefined)

export const ApiServicesProvider: React.FC<ServicesProviderProps> = ({
  children,
  config,
  getToken,
  queryClient,
}) => {
  const services = {
    authService: createAuthService(config),
    nodesService: createNodesService(config),
    userNodesService: createUserNodesService(config),
    characteristicsService: createCharacteristicsService(config),
    productsService: createProductsService(config),
    servicesService: createServicesService(config),
    usersService: createUsersService(config),
    userZonesService: createUserZonesService(config),
    zonesService: createZonesService(config),
  }

  useEffect(() => {
    setGetTokenFunction(getToken)
  }, [getToken])

  return (
    <QueryClientProvider client={queryClient}>
      <ApiServicesContext.Provider value={services}>
        {children}
      </ApiServicesContext.Provider>
    </QueryClientProvider>
  )
}

export const useApiServices = () => {
  const context = useContext(ApiServicesContext)
  if (!context) {
    throw new Error('useApiServices must be used within an ApiServicesProvider')
  }
  return context
}
