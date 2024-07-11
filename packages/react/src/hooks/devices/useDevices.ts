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

type UseDevicesArgs = {
  pagination: PaginationOffsetArgs
  filters: DevicesFilter
}

export const useDevices = ({ pagination, filters }: UseDevicesArgs) => {
  const { devicesService } = useApiServices()
  const { data, error, ...queryResponse } = useQuery<
    DeviceConnection,
    ClientError
  >({
    queryKey: ['devices', pagination, filters],
    queryFn: () => devicesService.getDevices({ pagination, filters }),
  })

  const devices = data?.devices || []
  const totalCount = data?.totalCount || 0
  const errors = error?.response?.errors || null

  return { devices, totalCount, data, errors, ...queryResponse }
}
