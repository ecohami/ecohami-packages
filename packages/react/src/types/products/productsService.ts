// Internal
import {
  PaginationOffsetArgs,
  Product,
  ProductConnection,
  ProductsCursorConnection,
} from '..'

export interface ProductsService {
  getProduct(params: GetProductParams): Promise<Product>
  getProducts(params: GetProductsParams): Promise<ProductConnection>
  createProduct(params: CreateProductParams): Promise<Product>
  updateProduct(params: UpdateProductParams): Promise<Product>
  deleteProduct(params: DeleteProductParams): Promise<Product>
}

// One
// ------

// Params

export interface GetProductParams {
  id: string
}

// Response

export type ProductResponse = {
  product: Product
}

// Many
// ------

// Params

export interface GetProductsParams {
  pagination: PaginationOffsetArgs
  filters: ProductsFilter
}

// Query

export type ProductsFilter = {
  keyword?: string
  active?: boolean
}

export type ProductCursorQuery = {
  first?: number | null
  after?: string | null
  last?: number | null
  before?: string | null
  filters: ProductsFilter
}

// Response

export type ProductsResponse = {
  products: ProductConnection
}

export type ProductsCursorResponse = {
  productsCursor: ProductsCursorConnection
}

// Create
// ------

// Form

export type CreateProductFormValues = {
  name: string
  manufacturer: string
}

// Params

export interface CreateProductParams {
  input: CreateProductInput
}

// Mutation

export type CreateProductInput = {
  name: string
  manufacturer: string
}

// Response

export type CreateProductResponse = {
  createProduct: Product
}

// Update
// ------

// Form

export type UpdateProductFormValues = {
  name: string
  manufacturer: string
}

// Params

export interface UpdateProductParams {
  input: UpdateProductInput
}

// Mutation

export type UpdateProductInput = {
  id: string
  name?: string
  manufacturer?: string
}

// Response

export type UpdateProductResponse = {
  updateProduct: Product
}

// Delete
// ------

// Params

export interface DeleteProductParams {
  id: string
}

// Response

export type DeleteProductResponse = {
  deleteProduct: Product
}
