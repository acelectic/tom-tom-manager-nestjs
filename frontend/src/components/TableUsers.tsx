import { useCallback, useMemo } from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import paths from '../constant/paths'
import { numberWithCommas } from '../utils/helper'
import { useGetUsers } from '../services/user/user-query'
import Page from './commons/Page'
import BasicList from './BasicList'
import { usePageRunner } from '../utils/custom-hook'

interface TableUsersProps {
  transactionId?: string
}
const TableUsers = (props: TableUsersProps) => {
  type UsersType = typeof users
  const { transactionId } = props
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
