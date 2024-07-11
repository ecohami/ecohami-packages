// Local
import { PaginationOffsetArgs } from '../pagination'
import { Device, DeviceConnection } from './device'
import { DevicesFilter } from './devicesApi'

export interface UserDevicesService {
  getUserDevice(params: GetUserDeviceParams): Promise<Device>
  getUserDevices(params: GetUserDevicesParams): Promise<DeviceConnection>
}

// One
// ------

// Params

export interface GetUserDeviceParams {
  id: string
}

// Response

export type UserDeviceResponse = {
  userDevice: Device
}

// Many
// ------

// Params

export interface GetUserDevicesParams {
  pagination: PaginationOffsetArgs
  filters: DevicesFilter
}

// Response

export type UserDevicesResponse = {
  userDevices: DeviceConnection
}
