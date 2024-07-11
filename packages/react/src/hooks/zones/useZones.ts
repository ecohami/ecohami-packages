// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Local
import { PaginationOffsetArgs, ZoneConnection, ZonesFilter } from '../../types'
import { useApiServices } from '../../contexts'

type UseZonesArgs = {
  pagination: PaginationOffsetArgs
  filters: ZonesFilter
}

export const useZones = ({ pagination, filters }: UseZonesArgs) => {
  const { zonesService } = useApiServices()
  const { data, error, ...queryResponse } = useQuery<
    ZoneConnection,
    ClientError
  >({
    queryKey: ['zones', pagination, filters],
    queryFn: () => zonesService.getZones({ pagination, filters }),
  })

  const zones = data?.zones || []
  const totalCount = data?.totalCount || 0
  const errors = error?.response?.errors || null

  return { zones, totalCount, data, errors, ...queryResponse }
}
