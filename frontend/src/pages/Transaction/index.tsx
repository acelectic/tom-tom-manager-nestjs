import Page from '../../components/commons/Page'
import BasicList from '../../components/BasicList'
import {
  modifyTransaction,
  useGetTransactions,
} from '../../services/transaction/transaction-query'
import TransactionForm from './TransactionForm'
import Authenlize from '../../components/commons/Authenlize'
import { Role } from '../../services/auth/auth-types'
import { useMemo } from 'react'
import { usePageRunner } from '../../utils/custom-hook'

const Transaction = () => {
  const { page, pageSize, setNewPage, changePageSize } = usePageRunner()

  const { data: transactionsPaginate } = useGetTransactions({
    page,
    limit: pageSize,
  })
  const transactions = useMemo(() => {
    return transactionsPaginate
      ? transactionsPaginate?.items.map(modifyTransaction)
      : []
  }, [transactionsPaginate])
  return (
    <Page title={'Transaction Management'}>
      <Authenlize roles={[Role.ADMIN, Role.MANAGER]}>
        <TransactionForm />
      </Authenlize>
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
export default Transaction
