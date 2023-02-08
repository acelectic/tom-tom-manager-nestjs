import { CookieOptions } from 'express'

export enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  VIEWER = 'viewer',
}

export const cookieKeys = {
  accessToken: 'AccessToken',
  user: 'User',
} as const

export const cookieOptions: CookieOptions = {
  sameSite: 'none',
  httpOnly: false,
  maxAge: 7 * 24 * 60 * 1000,
  secure: true,
}
