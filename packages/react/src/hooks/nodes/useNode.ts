// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Local
import { Node } from '../../types'
import { useApiServices } from '../../contexts'

export const useNode = (id: string) => {
  const { nodesService } = useApiServices()
  const {
    data: node,
    error,
    ...queryResponse
  } = useQuery<Node, ClientError>({
    queryKey: ['node', id],
    queryFn: () => nodesService.getNode({ id }),
  })

  const errors = error?.response?.errors || null

  return { node, errors, ...queryResponse }
}
