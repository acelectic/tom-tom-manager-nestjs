import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useHistory } from 'react-router'
import BasicList from '../../../components/BasicList'
import Page from '../../../components/commons/Page'
import Space from '../../../components/commons/Space'
import { useGetPayments } from '../../../services/payment/payment-query'
import {
  modifyTransaction,
  useGetTransactions,
} from '../../../services/transaction/transaction-query'
import { useGetUser } from '../../../services/user/user-query'
import { useRouter } from '../../../utils/helper'
import UserDetailCard from './DetialCard'
import UserPayment from './UserPayment'
import UserTransaction from './UserTransaction'

const UserDetial = () => {
  const { query } = useRouter<{ userId: string }>()
  const { data: user } = useGetUser(query.userId)
  const { id: userId } = user || {}

  return (
    <Page title={''}>
      <Space direction="column" spacing={40}>
        <UserDetailCard user={user} />
        <UserTransaction userId={userId} />
        <UserPayment userId={userId} />
      </Space>
    </Page>
  )
}

export default UserDetial
