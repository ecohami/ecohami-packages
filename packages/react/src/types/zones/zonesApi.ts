// Local
import {
  PaginationCursorArgs,
  PaginationOffsetArgs,
  Zone,
  ZoneConnection,
  ZonesCursorConnection,
} from '..'

export interface ZonesService {
  getZone(params: GetZoneParams): Promise<Zone>
  getZones(params: GetZonesParams): Promise<ZoneConnection>
  getZonesCursor(params: GetZonesCursorParams): Promise<ZonesCursorConnection>
  createZone(params: CreateZoneParams): Promise<Zone>
  updateZone(params: UpdateZoneParams): Promise<Zone>
  deleteZone(params: DeleteZoneParams): Promise<Zone>
}

// One
// ------

// Params

export interface GetZoneParams {
  id: string
}

// Response

export type ZoneResponse = {
  zone: Zone
}

// Many
// ------

// Params

export interface GetZonesParams {
  pagination: PaginationOffsetArgs
  filters: ZonesFilter
}

export interface GetZonesCursorParams {
  pagination: PaginationCursorArgs
  filters: ZonesFilter
}

// Query

export type ZonesFilter = {
  keyword?: string
  active?: boolean
}

export type ZoneCursorQuery = {
  first?: number | null
  after?: string | null
  last?: number | null
  before?: string | null
  filters: ZonesFilter
}

// Response

export type ZonesResponse = {
  zones: ZoneConnection
}

export type ZonesCursorResponse = {
  zonesCursor: ZonesCursorConnection
}

// Create
// ------

// Form

export type CreateZoneFormValues = {
  name: string
  location: string
}

// Params

export interface CreateZoneParams {
  input: CreateZoneInput
}

export type CreateZoneInput = {
  name: string
  location: string
}

// Response

export type CreateZoneResponse = {
  createZone: Zone
}

// Update
// ------

// Form

export type UpdateZoneFormValues = {
  name: string
  location: string
}

// Params

export interface UpdateZoneParams {
  input: UpdateZoneInput
}

export type UpdateZoneInput = {
  id: string
  name?: string
  location?: string
}

// Response

export type UpdateZoneResponse = {
  updateZone: Zone
}

// Delete
// ------

// Params

export interface DeleteZoneParams {
  id: string
}

// Response

export type DeleteZoneResponse = {
  deleteZone: Zone
}
