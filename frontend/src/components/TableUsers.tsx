import { useCallback, useMemo } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import paths from '../constant/paths'
import { numberWithCommas } from '../utils/helper'
import { useGetUsers } from '../services/user/user-query'
import Page from './commons/Page'
import BasicList from './BasicList'
import { usePageRunner, useSnackbar } from '../utils/custom-hook'
import { useConfirmUserAllPayments } from '../services/payment/payment-query'
import Authenlize from './commons/Authenlize'
import { sumBy } from 'lodash'
import { Role } from '../services/auth/auth-types'
import Space from './commons/Space'

interface TableUsersProps {
  transactionId?: string
}
const TableUsers = (props: TableUsersProps) => {
  type UsersType = typeof users
  const { transactionId } = props
  const { snackbar } = useSnackbar()
  const { mutate: confirmUserAllPayments } = useConfirmUserAllPayments()
  const { page, pageSize, setNewPage, changePageSize } = usePageRunner({
    alias: {
      page: 'users-page',
      perPage: 'users-per-page',
    },
  })
  const { data: usersPagination } = useGetUsers({
    transactionId,
    page,
    limit: pageSize,
  })
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
  const renderActions = useCallback((data: UsersType[number]) => {
    const sumPrice = sumBy(data.payments, ({ status, price }) =>
      status === 'pending' ? price : 0,
    )

    return (
      <Space spacing={10}>
        <Authenlize roles={[Role.ADMIN]} allowLocalAdmin>
          <Button
            variant="outlined"
            color={'secondary'}
            style={{ fontWeight: 'bold' }}
            size="small"
            disabled={!sumPrice}
            onClick={() => {
              confirmUserAllPayments(
                {
                  userId: data.id,
                },
                {
                  onSuccess: () => {
                    snackbar({
                      type: 'success',
                      message: `Confirmr Payment: ${
                        data.name
                      }, Price: ${numberWithCommas(sumPrice)}`,
                    })
                  },
                },
              )
            }}
          >
            Confirm All Payments
          </Button>
        </Authenlize>
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
      </Space>
    )
  }, [])

  return (
    <Page title={'Users'}>
      <BasicList
        data={users}
        columns={['name', 'email', 'balance']}
        renderActions={renderActions}
        paginate
        page={page}
        limit={pageSize}
        onChangePage={setNewPage}
        onChangeRowsPerPage={changePageSize}
        total={usersPagination?.meta.totalItems || 0}
      />
    </Page>
  )
}
export default TableUsers
