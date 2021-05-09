import { Button } from '@material-ui/core'
import { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import paths from '../constant/paths'
import { Role } from '../services/auth/auth-types'
import {
  useGetTransactions,
  modifyTransaction,
} from '../services/transaction/transaction-query'
import { usePageRunner } from '../utils/custom-hook'
import BasicList from './BasicList'
import Authenlize from './commons/Authenlize'
import Page from './commons/Page'

interface TableTransactionsProps {
  userId?: string
}
const TableTransactions = (props: TableTransactionsProps) => {
  const { userId } = props
  const { page, pageSize, setNewPage, changePageSize } = usePageRunner({
    alias: {
      page: 'transaction-page',
      perPage: 'transaction-per-page',
    },
  })

  const { data: transactionsPaginate } = useGetTransactions({
    userId,
    page,
    limit: pageSize,
  })
  const transactions = useMemo(() => {
    return transactionsPaginate
      ? transactionsPaginate?.items.map(modifyTransaction)
      : []
  }, [transactionsPaginate])

  const renderActions = useCallback((data: typeof transactions[number]) => {
    return (
      <Authenlize roles={[Role.ADMIN, Role.MANAGER]} allowLocalAdmin>
        <Link
          to={paths.transactionDetail({
            routeParam: {
              transactionId: data.id,
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
      </Authenlize>
    )
  }, [])
  return (
    <Page title={'Transaction'}>
      <BasicList
        data={transactions}
        columns={['ref', 'totalUser', 'remain', 'price', 'date', 'completed']}
        renderActions={renderActions}
        paginate
        page={page}
        limit={pageSize}
        onChangePage={setNewPage}
        onChangeRowsPerPage={changePageSize}
        total={transactionsPaginate?.meta.totalItems || 0}
      />
    </Page>
  )
}
export default TableTransactions
