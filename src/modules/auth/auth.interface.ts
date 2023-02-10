import { UserSignInType } from '../../db/entities/User'
import { Role } from './auth.constant'

export type AccessTokenJwtPayload = {
  id: string
  email?: string
  role?: string
}

export type RefreshTokenJwtPayload = {
  id: string
  email?: string
  role?: string
}

export type ResponseOtpRequest = {
  data: {
    status: string
    token: string
  }
}

export type ParamSignInBase = {
  email: string
  name?: string
  password: string
  role: Role
}

export type ResponseGoogleSignIn = {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  emailVerified: string
  name: string
  picture: string
  givenName: string
  familyName: string
  locale: string
  iat: string
  exp: string
  alg: string
  kid: string
  typ: string
}

export type ResponseFacebookSignIn = {
  data: {
    appId: string
    type: string
    application: string
    dataAccessExpiresAt: Date
    expiresAt: Date
    isValid: boolean
    issuedAt: Date
    metadata: object
    scopes: object
    userId: string
  }
}

export type ResponseFacebookDetail = {
  id: string
  name: string
  email: string
  firstName: string
  lastName: string
}

export type ResponseAppleDetail = {
  iss: string
  aud: string
  exp: Date
  iat: Date
  sub: string
  nonce: string
  at_hash: string
  email: string
  email_verified: string
  auth_time: Date
  nonce_supported: boolean
}
