// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Local
import { Zone } from '../../types'
import { useApiServices } from '../../contexts'

export const useUserZone = (id: string | null) => {
  const { userZonesService } = useApiServices()
  const {
    data: zone,
    error,
    ...queryResponse
  } = useQuery<Zone, ClientError>({
    queryKey: ['zone', id],
    queryFn: () => userZonesService.getUserZone({ id: id ?? '' }),
    enabled: !!id,
  })

  const errors = error?.response?.errors || null

  return { zone, errors, ...queryResponse }
}
