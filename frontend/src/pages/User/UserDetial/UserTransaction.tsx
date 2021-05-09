import { useMemo } from 'react'
import BasicList from '../../../components/BasicList'
import Authenlize from '../../../components/commons/Authenlize'
import Page from '../../../components/commons/Page'
import { Role } from '../../../services/auth/auth-types'
import {
  useGetTransactions,
  modifyTransaction,
} from '../../../services/transaction/transaction-query'
import { usePageRunner } from '../../../utils/custom-hook'
import TransactionForm from '../../Transaction/TransactionForm'

interface UserTransactionProps {
  userId?: string
}
const UserTransaction = (props: UserTransactionProps) => {
  const { userId } = props
  const { page, pageSize, setNewPage, changePageSize } = usePageRunner({
    alias: {
      page: 'transaction-page',
      perPage: 'transaction-per-page',
    },
  })

  const { data: transactionsPaginate } = useGetTransactions(
    {
      userId,
      page,
      limit: pageSize,
    },
    {
      enabled: !!userId,
    },
  )
  const transactions = useMemo(() => {
    return transactionsPaginate
      ? transactionsPaginate?.items.map(modifyTransaction)
      : []
  }, [transactionsPaginate])
  return (
    <Page title={'Transaction'}>
      <BasicList
        data={transactions}
        columns={['ref', 'totalUser', 'remain', 'price', 'date', 'completed']}
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
export default UserTransaction
