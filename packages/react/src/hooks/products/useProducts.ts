// External
import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

// Internal
import {
  PaginationOffsetArgs,
  ProductConnection,
  ProductsFilter,
} from '../../types'
import { useApiServices } from '../../contexts'

type UseProductsArgs = {
  pagination: PaginationOffsetArgs
  filters: ProductsFilter
}

export const useProducts = ({ pagination, filters }: UseProductsArgs) => {
  const { productsService } = useApiServices()
  const { data, error, ...queryResponse } = useQuery<
    ProductConnection,
    ClientError
  >({
    queryKey: ['products', pagination, filters],
    queryFn: () => productsService.getProducts({ pagination, filters }),
  })

  const products = data?.products || []
  const totalCount = data?.totalCount || 0
  const errors = error?.response?.errors || null

  return { products, totalCount, data, errors, ...queryResponse }
}
