// Internal
import { PaginationOffsetArgs } from '../pagination'
import { Zone, ZoneConnection } from './zone'
import { ZonesFilter } from './zonesService'

export interface UserZonesService {
  getUserZone(params: GetUserZoneParams): Promise<Zone>
  getUserZones(params: GetUserZonesParams): Promise<ZoneConnection>
  createUserZone(params: CreateUserZoneParams): Promise<Zone>
  updateUserZone(params: UpdateUserZoneParams): Promise<Zone>
  deleteUserZone(params: DeleteUserZoneParams): Promise<Zone>
}

// One
// ------

// Params

export interface GetUserZoneParams {
  id: string
}

// Response

export type UserZoneResponse = {
  userZone: Zone
}

// Many
// ------

// Params

export interface GetUserZonesParams {
  pagination: PaginationOffsetArgs
  filters: ZonesFilter
}

// Response

export type UserZonesResponse = {
  userZones: ZoneConnection
}

// Create
// ------

// Form

export type CreateUserZoneFormValues = {
  name: string
  location: string
  wifiSsid: string
  wifiPassword: string
  mqttUrl: string
  mqttPort: number
}

// Params

export interface CreateUserZoneParams {
  input: CreateUserZoneInput
}

export type CreateUserZoneInput = {
  name: string
  location: string
  wifiSsid: string
  wifiPassword: string
  mqttUrl: string
  mqttPort: number
}

// Response

export type CreateUserZoneResponse = {
  createUserZone: Zone
}

// Update
// ------

// Form

export type UpdateUserZoneFormValues = {
  name: string
  location: string
  wifiSsid: string
  wifiPassword: string
  mqttUrl: string
  mqttPort: number
}

// Params

export interface UpdateUserZoneParams {
  input: UpdateUserZoneInput
}

export type UpdateUserZoneInput = {
  id: string
  name?: string
  location?: string
  wifiSsid?: string
  wifiPassword?: string
  mqttUrl?: string
  mqttPort?: number
}

// Response

export type UpdateUserZoneResponse = {
  updateUserZone: Zone
}

// Delete
// ------

// Params

export interface DeleteUserZoneParams {
  id: string
}

// Response

export type DeleteUserZoneResponse = {
  deleteZone: Zone
}
