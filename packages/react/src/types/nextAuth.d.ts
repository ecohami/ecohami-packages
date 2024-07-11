// External
import 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string | unknown
    error?: string | unknown
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
      roles?: UserRole[]
    }
  }

  interface User {
    accessToken?: string
    refreshToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    idToken?: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    error?: string
  }
}
