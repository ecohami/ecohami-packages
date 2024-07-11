export interface AuthService {
  refreshToken(refreshToken: RefreshTokenParams): Promise<Token>
  federatedLogout(): Promise<void>
}

export type Token = {
  accessToken: string
  accessTokenExp: number
  refreshToken: string
}

export type RefreshTokenResponse = {
  refreshToken: Token
}

export type RefreshTokenParams = {
  refreshToken: string
}
