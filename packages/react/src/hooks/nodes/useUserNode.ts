// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Local
import { Node } from '../../types'
import { useApiServices } from '../../contexts'

export const useUserNode = (id: string | null) => {
  const { userNodesService } = useApiServices()
  const {
    data: node,
    error,
    ...queryResponse
  } = useQuery<Node, ClientError>({
    queryKey: ['node', id],
    queryFn: () => userNodesService.getUserNode({ id: id ?? '' }),
    enabled: !!id,
  })

  const errors = error?.response?.errors || null

  return { node, errors, ...queryResponse }
}
