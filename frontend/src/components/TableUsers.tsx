import { useCallback, useMemo } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import paths from '../constant/paths'
import { numberWithCommas } from '../utils/helper'
import { useGetUsers } from '../services/user/user-query'
import Page from './commons/Page'
import { usePageRunner, useSnackbar } from '../utils/custom-hook'
import { useConfirmUserAllPayments } from '../services/payment/payment-query'
import Authorize from './commons/Authorize'
import { sumBy } from 'lodash'
import { Role } from '../services/auth/auth-types'
import Space from './commons/Space'
import { Table } from 'antd'
import { ColumnType } from 'antd/es/table'

interface TableUsersProps {
  transactionId?: string
}
const TableUsers = (props: TableUsersProps) => {
  type UsersType = typeof dataSource
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
  const dataSource = useMemo(
    () =>
      usersPagination
        ? usersPagination?.items.map(d => ({
            ...d,
            balance: numberWithCommas(d.balance),
          }))
        : [],
    [usersPagination],
  )
  const renderActions = useCallback(
    (data: UsersType[number]) => {
      const sumPrice = sumBy(data.payments, ({ status, price }) =>
        status === 'pending' ? price : 0,
      )

      return (
        <Space spacing={10}>
          <Authorize roles={[Role.ADMIN]} allowLocalAdmin>
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
          </Authorize>
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
    },
    [confirmUserAllPayments, snackbar],
  )

  const columns = useMemo(() => {
    const tmpColumns: ColumnType<typeof dataSource[number]>[] = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Balance',
        dataIndex: 'balance',
      },
      {
        render: (value, record) => {
          return renderActions(record)
        },
      },
    ]
    return tmpColumns
  }, [renderActions])

  return (
    <Page title={'Users'}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          size: 'small',
          current: page,
          pageSize,
          total: usersPagination?.meta.totalItems || 0,
          onChange: (page, pageSize) => {
            setNewPage(page)
            changePageSize(pageSize)
          },
        }}
      />
    </Page>
  )
}
export default TableUsers
