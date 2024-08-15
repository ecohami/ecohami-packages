// Local
import {
  PaginationOffsetArgs,
  Service,
  ServiceConnection,
  ServicesCursorConnection,
} from '..'

export interface ServicesService {
  getService(params: GetServiceParams): Promise<Service>
  getServices(params: GetServicesParams): Promise<ServiceConnection>
  createService(params: CreateServiceParams): Promise<Service>
  updateService(params: UpdateServiceParams): Promise<Service>
  deleteService(params: DeleteServiceParams): Promise<Service>
}

// One
// ------

// Params

export interface GetServiceParams {
  id: string
}

// Response

export type ServiceResponse = {
  service: Service
}

// Many
// ------

// Params

export interface GetServicesParams {
  pagination: PaginationOffsetArgs
  filters: ServicesFilter
}

// Query

export type ServicesFilter = {
  keyword?: string
  active?: boolean
}

export type ServiceCursorQuery = {
  first?: number | null
  after?: string | null
  last?: number | null
  before?: string | null
  filters: ServicesFilter
}

// Response

export type ServicesResponse = {
  services: ServiceConnection
}

export type ServicesCursorResponse = {
  servicesCursor: ServicesCursorConnection
}

// Create
// ------

// Form

export type CreateServiceFormValues = {
  name: string
  uuid: string
  description: string
}

// Params

export interface CreateServiceParams {
  input: CreateServiceInput
}

export type CreateServiceInput = {
  name: string
  uuid: string
  description: string
}

// Response

export type CreateServiceResponse = {
  createService: Service
}

// Update
// ------

// Form

export type UpdateServiceFormValues = {
  name: string
  uuid: string
  description: string
}

// Params

export interface UpdateServiceParams {
  input: UpdateServiceInput
}

export type UpdateServiceInput = {
  id: string
  name?: string
  uuid?: string
  description?: string
}

// Response

export type UpdateServiceResponse = {
  updateService: Service
}

// Delete
// ------

// Params

export interface DeleteServiceParams {
  id: string
}

// Response

export type DeleteServiceResponse = {
  deleteService: Service
}
