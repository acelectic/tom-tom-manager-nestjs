import { useCreateUser, useGetUsers } from '../../services/user/user-query'
import Page from '../../components/commons/Page'
import BasicList from '../../components/BasicList'
import { Role, SigninParams } from '../../services/auth/auth-types'
import Authenlize from '../../components/commons/Authenlize'
import AddButton from '../../components/AddButton'

const Users = () => {
  const { data: users } = useGetUsers()
  const { mutate: createUser } = useCreateUser()

  return (
    <Page title={'User Management'}>
      <Authenlize role={[Role.ADMIN]}>
        <AddButton
          fieldNames={['name', 'email', 'password']}
          name={'Add User'}
          onSubmit={(v) => {
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
      <BasicList data={users} columns={['name', 'email', 'balance']} />
    </Page>
  )
}
export default Users
