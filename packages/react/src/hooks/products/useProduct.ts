import { useQuery } from '@tanstack/react-query'
import { ClientError } from 'graphql-request'

import { Product } from '../../types'
import { useApiServices } from '../../contexts'

export const useProduct = (id: string) => {
  const { productsService } = useApiServices()
  const {
    data: product,
    error,
    ...queryResponse
  } = useQuery<Product, ClientError>({
    queryKey: ['product', id],
    queryFn: () => productsService.getProduct({ id }),
  })

  const errors = error?.response?.errors || null

  return { product, errors, ...queryResponse }
}
