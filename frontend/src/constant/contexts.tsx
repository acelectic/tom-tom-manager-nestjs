import { TemplateFormValues } from '../pages/Setting/TemplateForm'
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
interface TemplateFormValuesCtx extends TemplateFormValues {
  visible: boolean
}
export const TemplateFormCtx = createCtx({
  visible: false,
  isActive: (undefined as unknown) as boolean,
  ref: '',
  resourceIds: [],
} as TemplateFormValuesCtx)
