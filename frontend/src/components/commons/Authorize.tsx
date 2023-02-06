import { PropsWithChildren, useMemo } from 'react'
import { useCurrUser } from '../../services/auth/auth-query'
import { Role } from '../../services/auth/auth-types'

interface IAuthorizeProps {
  roles?: Role[]
  allowLocalAdmin?: boolean
}
const Authorize = (props: PropsWithChildren<IAuthorizeProps>) => {
  const { roles = [], allowLocalAdmin, children } = props
  const { data: user } = useCurrUser()
  const { role, email } = user || {}
  const isAllowed = useMemo(() => {
    if (role && roles.includes(role)) {
      return true
    }
    if (
      allowLocalAdmin &&
      process.env.REACT_APP_ADMIN_EMAIL &&
      email === process.env.REACT_APP_ADMIN_EMAIL
    ) {
      return true
    }
    return false
  }, [allowLocalAdmin, email, role, roles])
  return isAllowed ? <>{children}</> : <></>
}
export default Authorize
