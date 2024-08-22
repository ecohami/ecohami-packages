// Local
import type { PaginationOffsetArgs } from '../pagination'
import type { Device, DeviceConnection } from './device'
import type { DevicesFilter } from './devicesService'

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

// Create
// ------

// Form

export type CreateUserDeviceFormValues = {
  name: string
  deviceId: string
}

// Params

export interface CreateUserDeviceParams {
  input: CreateUserDeviceInput
}

export type CreateUserDeviceInput = {
  name: string
  deviceId: string
  serviceIds: string[]
}

// Response

export type CreateUserDeviceResponse = {
  createDevice: Device
}

// Update
// ------

// Form

export type UpdateUserDeviceFormValues = {
  name: string
  deviceId: string
}

// Params

export interface UpdateUserDeviceParams {
  input: UpdateUserDeviceInput
}

export type UpdateUserDeviceInput = {
  id: string
  name?: string
  deviceId?: string
}

// Response

export type UpdateUserDeviceResponse = {
  updateDevice: Device
}

// Delete
// ------

// Params

export interface DeleteUserDeviceParams {
  id: string
}

// Response

export type DeleteUserDeviceResponse = {
  deleteDevice: Device
}
