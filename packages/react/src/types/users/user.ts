export type User = {
  id: string
  auth: UserAuth
  email: string
  name: string
  roles: UserRole[]
  lang: string
  theme: string
  status: UserStatus
  createdAt: string
  updatedAt: string
}
export enum UserAuth {
  CREDENTIALS = 'CREDENTIALS',
  GOOGLE = 'GOOGLE',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING = 'PENDING',
}

export type UserConnection = {
  users: User[]
  totalCount: number
}
