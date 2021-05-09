import Page from '../../components/commons/Page'
import TransactionForm from './TransactionForm'
import Authenlize from '../../components/commons/Authenlize'
import { Role } from '../../services/auth/auth-types'
import TableTransactions from '../../components/TableTransactions'

const Transaction = () => {
  return (
    <Page title={'Transaction Management'}>
      <Authenlize roles={[Role.ADMIN, Role.MANAGER]} allowLocalAdmin>
        <TransactionForm />
      </Authenlize>
      <TableTransactions />
    </Page>
  )
}
export default Transaction
