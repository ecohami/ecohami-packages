// External
import { useQuery } from '@tanstack/react-query'
import type { ClientError } from 'graphql-request'

// Local
import { useApiServices } from '../../contexts'
import type {
  DeviceConnection,
  DevicesFilter,
  PaginationOffsetArgs,
} from '../../types'

type UseUserDevicesArgs = {
  pagination: PaginationOffsetArgs
  filters: DevicesFilter
}

export const useUserDevices = ({ pagination, filters }: UseUserDevicesArgs) => {
  const { userDevicesService } = useApiServices()
  const { data, error, ...queryResponse } = useQuery<
    DeviceConnection,
    ClientError
  >({
    queryKey: ['userDevices', pagination, filters],
    queryFn: () => userDevicesService.getUserDevices({ pagination, filters }),
  })

  const devices = data?.devices || []
  const totalCount = data?.totalCount || 0
  const errors = error?.response?.errors || null

  return { devices, totalCount, data, errors, ...queryResponse }
}
