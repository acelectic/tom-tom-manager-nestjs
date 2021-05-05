import { UserSignInType } from '../../db/entities/User'
import { Role } from '../auth/auth.constant'

export type ParamsCreateUserSignIn = {
  email: string
  // accountId: string;
  // typeSignIn: UserSignInType
  password: string
  role: Role
  name: string
}
