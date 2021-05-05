import { Role } from '../services/auth/auth-types'
import { createCtx } from '../utils/helper'

export const AppCtx = createCtx({})
export const UpdateUserCtx = createCtx({
  visible: false,
  userId: '',
  name: '',
  password: '',
  role: '' as Role,
})
