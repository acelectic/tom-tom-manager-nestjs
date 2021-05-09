import { useCreateUser, useGetUsers } from '../../services/user/user-query'
import Page from '../../components/commons/Page'
import { Role, SigninParams } from '../../services/auth/auth-types'
import Authenlize from '../../components/commons/Authenlize'
import AddButton from '../../components/AddButton'
import { useCallback, useMemo } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import paths from '../../constant/paths'
import { numberWithCommas } from '../../utils/helper'
import TableUsers from '../../components/TableUsers'

const Users = () => {
  const { mutate: createUser } = useCreateUser()
  return (
    <Page title={'User Management'}>
      <Authenlize roles={[Role.ADMIN]}>
        <AddButton
          fieldNames={['name', 'email', 'password']}
          name={'Add User'}
          onSubmit={v => {
            const { email, password, name } = v as SigninParams
            console.log(v)
            createUser({
              email,
              password,
              name,
            })
          }}
        />
      </Authenlize>
      <TableUsers />
    </Page>
  )
}
export default Users
