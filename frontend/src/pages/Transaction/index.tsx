import Page from '../../components/commons/Page'
import BasicList from '../../components/BasicList'
import { useGetTransactions } from '../../services/transaction/transaction-query'
import TransactionForm from './TransactionForm'
import Authenlize from '../../components/commons/Authenlize'
import { Role } from '../../services/auth/auth-types'

const Transaction = () => {
  const { data: transactions } = useGetTransactions()

  return (
    <Page title={'Transaction Management'}>
      <Authenlize roles={[Role.ADMIN, Role.MANAGER]}>
        <TransactionForm />
      </Authenlize>
      <BasicList
        data={transactions}
        columns={['ref', 'totalUser', 'remain', 'price', 'date', 'completed']}
      />
    </Page>
  )
}
export default Transaction
