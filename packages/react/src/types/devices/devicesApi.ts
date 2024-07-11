// Local
import {
  Device,
  DeviceConnection,
  DevicesCursorConnection,
  PaginationCursorArgs,
  PaginationOffsetArgs,
} from '..'

export interface DevicesService {
  getDevice(params: GetDeviceParams): Promise<Device>
  getDevices(params: GetDevicesParams): Promise<DeviceConnection>
  getDevicesCursor(
    params: GetDevicesCursorParams,
  ): Promise<DevicesCursorConnection>
  createDevice(params: CreateDeviceParams): Promise<Device>
  updateDevice(params: UpdateDeviceParams): Promise<Device>
  deleteDevice(params: DeleteDeviceParams): Promise<Device>
}

// One
// ------

// Params

export interface GetDeviceParams {
  id: string
}

// Response

export type DeviceResponse = {
  device: Device
}

// Many
// ------

// Params

export interface GetDevicesParams {
  pagination: PaginationOffsetArgs
  filters: DevicesFilter
}

export interface GetDevicesCursorParams {
  pagination: PaginationCursorArgs
  filters: DevicesFilter
}

// Query

export type DevicesFilter = {
  keyword?: string
  active?: boolean
}

export type DeviceCursorQuery = {
  first?: number | null
  after?: string | null
  last?: number | null
  before?: string | null
  filters: DevicesFilter
}

// Response

export type DevicesResponse = {
  devices: DeviceConnection
}

export type DevicesCursorResponse = {
  devicesCursor: DevicesCursorConnection
}

// Create
// ------

// Form

export type CreateDeviceFormValues = {
  name: string
  deviceId: string
  macAddress: string
}

// Params

export interface CreateDeviceParams {
  input: CreateDeviceInput
}

export type CreateDeviceInput = {
  name: string
  deviceId: string
  macAddress: string
  serviceIds: string[]
}

// Response

export type CreateDeviceResponse = {
  createDevice: Device
}

// Update
// ------

// Form

export type UpdateDeviceFormValues = {
  name: string
  deviceId: string
  macAddress: string
}

// Params

export interface UpdateDeviceParams {
  input: UpdateDeviceInput
}

export type UpdateDeviceInput = {
  id: string
  name?: string
  deviceId?: string
  macAddress?: string
}

// Response

export type UpdateDeviceResponse = {
  updateDevice: Device
}

// Delete
// ------

// Params

export interface DeleteDeviceParams {
  id: string
}

// Response

export type DeleteDeviceResponse = {
  deleteDevice: Device
}
