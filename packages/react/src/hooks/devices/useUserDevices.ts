// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Local
import {
  DeviceConnection,
  DevicesFilter,
  PaginationOffsetArgs,
} from '../../types'
import { useApiServices } from '../../contexts'

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
