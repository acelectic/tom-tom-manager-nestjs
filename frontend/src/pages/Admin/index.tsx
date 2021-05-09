import { Button } from '@material-ui/core'
import { capitalize } from 'lodash'
import { useCallback, useContext, useMemo } from 'react'
import BasicList from '../../components/BasicList'
import Page from '../../components/commons/Page'
import Space from '../../components/commons/Space'
import { UpdateUserCtx } from '../../constant/contexts'
import { Role, UserEntity } from '../../services/auth/auth-types'
import { useChangeRole, useGetUsers } from '../../services/user/user-query'
import { numberWithCommas, withCtx } from '../../utils/helper'
import UpdateUser from './UpdateUser'

const Admin = () => {
  const { data: usersPagination } = useGetUsers()
  const { mutate: changeRole } = useChangeRole()
  const [, setState] = useContext(UpdateUserCtx)

  const renderButtonAction = useCallback(
    (userId: string, userRole: Role, role: Role) => {
      return (
        <Button
          key={`${userId}-${userRole}-${role}`}
          variant="contained"
          color={userRole === role ? 'secondary' : 'default'}
          style={{ fontWeight: 'bold' }}
          size="small"
          // disabled={role === Role.USER}
          onClick={() => {
            userRole !== role &&
              changeRole({
                userId,
                role,
              })
          }}
        >
          {capitalize(role)}
        </Button>
      )
    },
    [changeRole],
  )

  const renderActions = useCallback(
    (data: UsersType[number]) => {
      const { id: userId, name, role: userRole } = data
      const roles = [Role.USER, Role.MANAGER, Role.ADMIN]
      return (
        <Space spacing={10}>
          <Space spacing={10}>
            {roles.map(role => renderButtonAction(userId, userRole, role))}
          </Space>
          <Button
            variant="outlined"
            color={'primary'}
            style={{ fontWeight: 'bold' }}
            size="small"
            onClick={() => {
              setState({
                visible: true,
                userId,
                name,
                role: userRole,
              })
            }}
          >
            Edit
          </Button>
        </Space>
      )
    },
    [renderButtonAction, setState],
  )

  type UsersType = typeof users
  const users = useMemo(
    () =>
      usersPagination
        ? usersPagination?.items.map(d => ({
            ...d,
            balance: numberWithCommas(d.balance),
          }))
        : [],
    [usersPagination],
  )

  return (
    <Page title="Admin">
      <BasicList
        data={users}
        columns={['name', 'email', 'balance']}
        renderActions={renderActions}
      />
      <UpdateUser />
    </Page>
  )
}

export default withCtx(UpdateUserCtx)(Admin)
