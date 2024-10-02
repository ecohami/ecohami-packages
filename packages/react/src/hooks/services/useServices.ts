// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Internal
import {
  PaginationOffsetArgs,
  ServiceConnection,
  ServicesFilter,
} from '../../types'
import { useApiServices } from '../../contexts'

type UseServicesArgs = {
  pagination: PaginationOffsetArgs
  filters: ServicesFilter
}

export const useServices = ({ pagination, filters }: UseServicesArgs) => {
  const { servicesService } = useApiServices()
  const { data, error, ...queryResponse } = useQuery<
    ServiceConnection,
    ClientError
  >({
    queryKey: ['services', pagination, filters],
    queryFn: () => servicesService.getServices({ pagination, filters }),
  })

  const services = data?.services || []
  const totalCount = data?.totalCount || 0
  const errors = error?.response?.errors || null

  return { services, totalCount, data, errors, ...queryResponse }
}
