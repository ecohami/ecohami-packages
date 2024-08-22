// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Local
import { NodeConnection, NodesFilter, PaginationOffsetArgs } from '../../types'
import { useApiServices } from '../../contexts'

type UseNodesArgs = {
  pagination: PaginationOffsetArgs
  filters: NodesFilter
}

export const useNodes = ({ pagination, filters }: UseNodesArgs) => {
  const { nodesService } = useApiServices()
  const { data, error, ...queryResponse } = useQuery<
    NodeConnection,
    ClientError
  >({
    queryKey: ['nodes', pagination, filters],
    queryFn: () => nodesService.getNodes({ pagination, filters }),
  })

  const nodes = data?.nodes || []
  const totalCount = data?.totalCount || 0
  const errors = error?.response?.errors || null

  return { nodes, totalCount, data, errors, ...queryResponse }
}
