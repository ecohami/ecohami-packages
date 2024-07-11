// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Local
import { User } from '../../types'
import { useApiServices } from '../../contexts'

export const useUser = (id: string) => {
  const { usersService } = useApiServices()
  const {
    data: user,
    error,
    ...queryResponse
  } = useQuery<User, ClientError>({
    queryKey: ['user', id],
    queryFn: () => usersService.getUser({ id }),
  })

  const errors = error?.response?.errors || null

  return { user, errors, ...queryResponse }
}
