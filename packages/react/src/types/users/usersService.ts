// Local
import { PaginationOffsetArgs, User, UserConnection } from '..'

export interface UsersService {
  getUser(params: GetUserParams): Promise<User>
  getUsers(params: GetUsersParams): Promise<UserConnection>
  updateUser(params: UpdateUserParams): Promise<User>
  deleteUser(params: DeleteUserParams): Promise<User>
}

// Me
// ------

// Response

export type MeResponse = {
  me: User
}

// One
// ------

// Params

export interface GetUserParams {
  id: string
}

// Response

export type UserResponse = {
  user: User
}

// Many
// ------

// Params

export interface GetUsersParams {
  pagination: PaginationOffsetArgs
  filters: UsersFilter
}

// Query

export type UsersFilter = {
  keyword?: string
  active?: boolean
}

// Response

export type UsersResponse = {
  users: UserConnection
}

// Create
// ------

// Form

export type CreateUserFormValues = {
  name: string
  uuid: string
}

// Params

export interface CreateUserParams {
  input: CreateUserInput
}

export type CreateUserInput = {
  name: string
  uuid: string
}

// Response

export type CreateUserResponse = {
  createUser: User
}

// Update
// ------

// Form

export type UpdateUserFormValues = {
  name: string
  uuid: string
}

// Params

export interface UpdateUserParams {
  input: UpdateUserInput
}

export type UpdateUserInput = {
  id: string
  name?: string
  uuid?: string
}

// Response

export type UpdateUserResponse = {
  updateUser: User
}

// Delete
// ------

// Params

export interface DeleteUserParams {
  id: string
}

// Response

export type DeleteUserResponse = {
  deleteUser: User
}
