import { useCreateUser, useGetUsers } from '../../services/user/user-query'
import Page from '../../components/commons/Page'
import BasicList from '../../components/BasicList'
import { Role, SigninParams, UserEntity } from '../../services/auth/auth-types'
import Authenlize from '../../components/commons/Authenlize'
import AddButton from '../../components/AddButton'
import { useCallback } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import paths from '../../constant/paths'

const Users = () => {
  const { data: users } = useGetUsers()
  const { mutate: createUser } = useCreateUser()

  const renderActions = useCallback((data: UserEntity) => {
    return (
      <>
        <Link
          to={paths.userDetail({
            routeParam: {
              userId: data.id,
            },
          })}
        >
          <Button
            variant="outlined"
            color={'primary'}
            style={{ fontWeight: 'bold' }}
            size="small"
          >
            See Detail
          </Button>
        </Link>
      </>
    )
  }, [])

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
      <BasicList
        data={users}
        columns={['name', 'email', 'balance']}
        renderActions={renderActions}
      />
    </Page>
  )
}
export default Users
