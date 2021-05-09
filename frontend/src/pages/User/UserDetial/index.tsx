import { useHistory } from 'react-router'
import BasicList from '../../../components/BasicList'
import Page from '../../../components/commons/Page'
import Space from '../../../components/commons/Space'
import { useGetPayments } from '../../../services/payment/payment-query'
import { useGetTransactions } from '../../../services/transaction/transaction-query'
import { useGetUser } from '../../../services/user/user-query'
import { useRouter } from '../../../utils/helper'
import UserDetailCard from './DetialCard'

const UserDetial = () => {
  const history = useHistory()
  const { query } = useRouter<{ userId: string }>()
  const { data: user } = useGetUser(query.userId)
  const { data: transactions } = useGetTransactions()
  const { data: payments } = useGetPayments()
  const { name } = user || {}
  return (
    <Page title={'User Detail'}>
      <Space direction="column" spacing={40}>
        <UserDetailCard user={user} />
        <BasicList
          data={transactions}
          columns={['ref', 'totalUser', 'remain', 'price', 'date', 'completed']}
        />
        <BasicList
          data={payments}
          columns={[
            'ref',
            'userName',
            'price',
            'type',
            'resource',
            'transaction',
            'date',
            'status',
          ]}
        />
      </Space>
    </Page>
  )
}

export default UserDetial
