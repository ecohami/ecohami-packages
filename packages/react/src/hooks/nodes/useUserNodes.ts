// External
import { useQuery } from '@tanstack/react-query'
import type { ClientError } from 'graphql-request'

// Internal
import { useApiServices } from '../../contexts'
import type {
  NodeConnection,
  NodesFilter,
  PaginationOffsetArgs,
} from '../../types'

type UseUserNodesArgs = {
  pagination: PaginationOffsetArgs
  filters: NodesFilter
}

export const useUserNodes = ({ pagination, filters }: UseUserNodesArgs) => {
  const { userNodesService } = useApiServices()
  const { data, error, ...queryResponse } = useQuery<
    NodeConnection,
    ClientError
  >({
    queryKey: ['userNodes', pagination, filters],
    queryFn: () => userNodesService.getUserNodes({ pagination, filters }),
  })

  const nodes = data?.nodes || []
  const totalCount = data?.totalCount || 0
  const errors = error?.response?.errors || null

  return { nodes, totalCount, data, errors, ...queryResponse }
}
