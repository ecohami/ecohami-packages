// Local
import { PaginationOffsetArgs } from '../pagination'
import { Zone, ZoneConnection } from './zone'
import { ZonesFilter } from './zonesApi'

export interface UserZonesService {
  getUserZone(params: GetUserZoneParams): Promise<Zone>
  getUserZones(params: GetUserZonesParams): Promise<ZoneConnection>
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
