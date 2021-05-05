import { PropsWithChildren } from 'react'
import { useCurrUser } from '../../services/auth/auth-query'
import { Role } from '../../services/auth/auth-types'

interface AuthenlizeProps {
  role: Role[]
}
const Authenlize = (props: PropsWithChildren<AuthenlizeProps>) => {
  const { data } = useCurrUser()
  return data?.role && props.role.includes(data?.role) ? (
    <>{props.children}</>
  ) : (
    <></>
  )
}
export default Authenlize
