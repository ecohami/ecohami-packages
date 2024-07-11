// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Local
import { Device } from '../../types'
import { useApiServices } from '../../contexts'

export const useUserDevice = (id: string | null) => {
  const { userDevicesService } = useApiServices()
  const {
    data: device,
    error,
    ...queryResponse
  } = useQuery<Device, ClientError>({
    queryKey: ['device', id],
    queryFn: () => userDevicesService.getUserDevice({ id: id ?? '' }),
    enabled: !!id,
  })

  const errors = error?.response?.errors || null

  return { device, errors, ...queryResponse }
}
