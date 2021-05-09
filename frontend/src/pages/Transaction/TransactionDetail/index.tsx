import Page from '../../../components/commons/Page'
import Space from '../../../components/commons/Space'
import TablePayments from '../../../components/TablePayments'
import { useGetTransaction } from '../../../services/transaction/transaction-query'
import { useRouter } from '../../../utils/helper'

const TransactionDetail = () => {
  const { query } = useRouter<{ transactionId: string }>()
  const { data: transaction } = useGetTransaction({
    transactionId: query.transactionId,
  })
  const { id: transactionId } = transaction || {}

  return (
    <Page title={''}>
      <Space direction="column" spacing={40}>
        <TablePayments transactionId={transactionId} />
      </Space>
    </Page>
  )
}
export default TransactionDetail
