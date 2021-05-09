import { AppSnackbarProps } from '../components/AppSnackbar'
import { TemplateFormValues } from '../pages/Setting/TemplateForm'
import { Role } from '../services/auth/auth-types'
import { createCtx } from '../utils/helper'

const AppSnackbarOption: AppSnackbarProps = {
  visible: false,
  message: '',
  type: 'info',
}
export const AppCtx = createCtx({
  appSnackbar: AppSnackbarOption,
})
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
