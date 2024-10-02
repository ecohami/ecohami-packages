// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Internal
import { Characteristic } from '../../types'
import { useApiServices } from '../../contexts'

export const useCharacteristic = (id: string) => {
  const { characteristicsService } = useApiServices()
  const {
    data: characteristic,
    error,
    ...queryResponse
  } = useQuery<Characteristic, ClientError>({
    queryKey: ['characteristic', id],
    queryFn: () => characteristicsService.getCharacteristic({ id }),
  })

  const errors = error?.response?.errors || null

  return { characteristic, errors, ...queryResponse }
}
