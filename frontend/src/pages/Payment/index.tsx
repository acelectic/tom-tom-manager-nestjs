import Page from '../../components/commons/Page'
import BasicList from '../../components/BasicList'
import { useGetPayments } from '../../services/payment/payment-query'
import { Role } from '../../services/auth/auth-types'
import Authenlize from '../../components/commons/Authenlize'
import { lazy, Suspense } from 'react'
const PaymentForm = lazy(() => import('./PaymentForm'))

const Payment = () => {
  const { data: payments } = useGetPayments()

  return (
    <Page title={'Payment Management'}>
      <Authenlize roles={[Role.ADMIN, Role.MANAGER]}>
        <Suspense fallback={<div>Loading...</div>}>
          <PaymentForm />
        </Suspense>
      </Authenlize>
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
        ]}
      />
    </Page>
  )
}
export default Payment
