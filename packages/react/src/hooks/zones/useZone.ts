// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Local
import { Zone } from '../../types'
import { useApiServices } from '../../contexts'

export const useZone = (id: string) => {
  const { zonesService } = useApiServices()
  const {
    data: zone,
    error,
    ...queryResponse
  } = useQuery<Zone, ClientError>({
    queryKey: ['zone', id],
    queryFn: () =>
      zonesService.getZone({
        id,
      }),
  })

  const errors = error?.response?.errors || null

  return { zone, errors, ...queryResponse }
}
