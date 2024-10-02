// Internal
import {
  Characteristic,
  CharacteristicConnection,
  CharacteristicsCursorConnection,
  PaginationOffsetArgs,
} from '../'

export interface CharacteristicsService {
  getCharacteristic(params: GetCharacteristicParams): Promise<Characteristic>
  getCharacteristics(
    params: GetCharacteristicsParams,
  ): Promise<CharacteristicConnection>
  createCharacteristic(
    params: CreateCharacteristicParams,
  ): Promise<Characteristic>
  updateCharacteristic(
    params: UpdateCharacteristicParams,
  ): Promise<Characteristic>
  deleteCharacteristic(
    params: DeleteCharacteristicParams,
  ): Promise<Characteristic>
}

// One
// ------

// Params

export interface GetCharacteristicParams {
  id: string
}

// Response

export type CharacteristicResponse = {
  characteristic: Characteristic
}

// Many
// ------

// Params

export interface GetCharacteristicsParams {
  pagination: PaginationOffsetArgs
  filters: CharacteristicsFilter
}

// Query

export type CharacteristicsFilter = {
  keyword?: string
  active?: boolean
}

export type CharacteristicCursorQuery = {
  first?: number | null
  after?: string | null
  last?: number | null
  before?: string | null
  filters: CharacteristicsFilter
}

// Response

export type CharacteristicsResponse = {
  characteristics: CharacteristicConnection
}

export type CharacteristicsCursorResponse = {
  characteristicsCursor: CharacteristicsCursorConnection
}

// Create
// ------

// Form

export type CreateCharacteristicFormValues = {
  name: string
  uuid: string
  properties: string
}

// Params

export interface CreateCharacteristicParams {
  input: CreateCharacteristicInput
}

export type CreateCharacteristicInput = {
  name: string
  uuid: string
  properties: string
}

// Response

export type CreateCharacteristicResponse = {
  createCharacteristic: Characteristic
}

// Update
// ------

// Form

export type UpdateCharacteristicFormValues = {
  name: string
  uuid: string
  properties: string
}

// Params

export interface UpdateCharacteristicParams {
  input: UpdateCharacteristicInput
}

export type UpdateCharacteristicInput = {
  id: string
  name?: string
  uuid?: string
  properties?: string
}

// Response

export type UpdateCharacteristicResponse = {
  updateCharacteristic: Characteristic
}

// Delete
// ------

// Params

export interface DeleteCharacteristicParams {
  id: string
}

// Response

export type DeleteCharacteristicResponse = {
  deleteCharacteristic: Characteristic
}
