// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Local
import { PaginationOffsetArgs, UserConnection, UsersFilter } from '../../types'
import { useApiServices } from '../../contexts'

type UseUsersArgs = {
  pagination: PaginationOffsetArgs
  filters: UsersFilter
}

export const useUsers = ({ pagination, filters }: UseUsersArgs) => {
  const { usersService } = useApiServices()
  const { data, error, ...queryResponse } = useQuery<
    UserConnection,
    ClientError
  >({
    queryKey: ['users', pagination, filters],
    queryFn: () => usersService.getUsers({ pagination, filters }),
  })

  const users = data?.users || []
  const totalCount = data?.totalCount || 0
  const errors = error?.response?.errors || null

  return { users, totalCount, data, errors, ...queryResponse }
}
