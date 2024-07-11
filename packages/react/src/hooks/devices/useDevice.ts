// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Local
import { Device } from '../../types'
import { useApiServices } from '../../contexts'

export const useDevice = (id: string) => {
  const { devicesService } = useApiServices()
  const {
    data: device,
    error,
    ...queryResponse
  } = useQuery<Device, ClientError>({
    queryKey: ['device', id],
    queryFn: () => devicesService.getDevice({ id }),
  })

  const errors = error?.response?.errors || null

  return { device, errors, ...queryResponse }
}
