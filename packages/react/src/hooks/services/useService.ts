// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Internal
import { Service } from '../../types'
import { useApiServices } from '../../contexts'

export const useService = (id: string) => {
  const { servicesService } = useApiServices()
  const {
    data: service,
    error,
    ...queryResponse
  } = useQuery<Service, ClientError>({
    queryKey: ['service', id],
    queryFn: () => servicesService.getService({ id }),
  })

  const errors = error?.response?.errors || null

  return { service, errors, ...queryResponse }
}
