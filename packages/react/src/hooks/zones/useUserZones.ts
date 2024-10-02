// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Internal
import { PaginationOffsetArgs, ZoneConnection, ZonesFilter } from '../../types'
import { useApiServices } from '../../contexts'

type UseUserZonesArgs = {
  pagination: PaginationOffsetArgs
  filters: ZonesFilter
}

export const useUserZones = ({ pagination, filters }: UseUserZonesArgs) => {
  const { userZonesService } = useApiServices()
  const { data, error, ...queryResponse } = useQuery<
    ZoneConnection,
    ClientError
  >({
    queryKey: ['userZones', pagination, filters],
    queryFn: () => userZonesService.getUserZones({ pagination, filters }),
  })

  const zones = data?.zones || []
  const totalCount = data?.totalCount || 0
  const errors = error?.response?.errors || null

  return { zones, totalCount, data, errors, ...queryResponse }
}
