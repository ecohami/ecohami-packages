// External
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Internal
import { useApiServices } from '../../contexts'
import {
  PaginationOffsetArgs,
  Zone,
  ZoneConnection,
  ZonesFilter,
} from '../../types'

type UseUserZonesArgs = {
  pagination: PaginationOffsetArgs
  filters: ZonesFilter
}

export const useUserZones = ({
  pagination,
  filters,
}: UseUserZonesArgs): UseQueryResult<ZoneConnection, ClientError> & {
  zones: Zone[]
  totalCount: number
  errors: ClientError['response']['errors'] | null
} => {
  const { userZonesService } = useApiServices()

  const queryResult = useQuery<ZoneConnection, ClientError>({
    queryKey: ['userZones', pagination, filters],
    queryFn: () => userZonesService.getUserZones({ pagination, filters }),
  })

  const { data, error } = queryResult
  const zones = data?.zones || []
  const totalCount = data?.totalCount || 0
  const errors = error?.response?.errors || null

  // Return both `queryResult` and our custom fields
  return {
    ...queryResult,
    zones,
    totalCount,
    errors,
  }
}
