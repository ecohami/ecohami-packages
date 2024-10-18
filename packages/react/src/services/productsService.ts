// External
import { gql } from 'graphql-request'

// Internal
import { getGraphQLClient } from '../lib/graphqlClient'
import {
  CreateProductParams,
  CreateProductResponse,
  DeleteProductParams,
  DeleteProductResponse,
  GetProductParams,
  GetProductsParams,
  GraphQLConfig,
  Product,
  ProductConnection,
  ProductResponse,
  ProductsResponse,
  UpdateProductParams,
  UpdateProductResponse,
} from '../types'

export const createProductsService = (config: GraphQLConfig) => {
  const getProduct = async ({ id }: GetProductParams): Promise<Product> => {
    const query = gql`
      query product($id: String!) {
        product(id: $id) {
          id
          name
          manufacturer
          createdAt
          updatedAt
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: ProductResponse = await graphQLClient.request(query, variables)
    return data.product
  }

  const getProducts = async ({
    pagination,
    filters,
  }: GetProductsParams): Promise<ProductConnection> => {
    const query = gql`
      query products($skip: Int!, $take: Int!, $filters: ProductsFilterInput) {
        products(skip: $skip, take: $take, filters: $filters) {
          products {
            id
            name
            manufacturer
            createdAt
            characteristics {
              id
              name
              peripheralCount
            }
          }
          totalCount
        }
      }
    `

    const { page, take } = pagination
    const variables = {
      skip: (page - 1) * take,
      take,
      filters,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: ProductsResponse = await graphQLClient.request(query, variables)
    return data.products
  }

  const createProduct = async ({
    input,
  }: CreateProductParams): Promise<Product> => {
    const query = gql`
      mutation createProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: CreateProductResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.createProduct
  }

  const updateProduct = async ({
    input,
  }: UpdateProductParams): Promise<Product> => {
    const query = gql`
      mutation updateProduct($input: UpdateProductInput!) {
        updateProduct(input: $input) {
          id
        }
      }
    `

    const variables = {
      input,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: UpdateProductResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.updateProduct
  }

  const deleteProduct = async ({
    id,
  }: DeleteProductParams): Promise<Product> => {
    const query = gql`
      mutation deleteProduct($id: String!) {
        deleteProduct(id: $id) {
          id
        }
      }
    `

    const variables = {
      id,
    }

    const graphQLClient = await getGraphQLClient(config)
    const data: DeleteProductResponse = await graphQLClient.request(
      query,
      variables,
    )
    return data.deleteProduct
  }

  return {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}
