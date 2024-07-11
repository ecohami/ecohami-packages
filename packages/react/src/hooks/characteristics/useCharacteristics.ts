// External
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'
import { GraphQLError } from 'graphql'

// Local
import {
  CharacteristicConnection,
  CharacteristicsFilter,
  PaginationOffsetArgs,
} from '../../types'
import { useApiServices } from '../../contexts'

type UseCharacteristicsArgs = {
  pagination: PaginationOffsetArgs
  filters: CharacteristicsFilter
}

type UseCharacteristicsReturnType = {
  characteristics: CharacteristicConnection['characteristics']
  totalCount: number
  errors: GraphQLError[] | null
} & Omit<
  UseQueryResult<CharacteristicConnection, ClientError>,
  'data' | 'error'
>

export const useCharacteristics = ({
  pagination,
  filters,
}: UseCharacteristicsArgs): UseCharacteristicsReturnType => {
  const { characteristicsService } = useApiServices()
  const { data, error, ...queryResponse } = useQuery<
    CharacteristicConnection,
    ClientError
  >({
    queryKey: ['characteristics', pagination, filters],
    queryFn: () =>
      characteristicsService.getCharacteristics({
        pagination,
        filters,
      }),
  })

  const characteristics = data?.characteristics || []
  const totalCount = data?.totalCount || 0
  const errors = error?.response?.errors || null

  return { characteristics, totalCount, errors, ...queryResponse }
}
