import Page from '../../components/commons/Page'
import BasicList from '../../components/BasicList'
import {
  useConfirmPayment,
  useGetPayments,
} from '../../services/payment/payment-query'
import { Role } from '../../services/auth/auth-types'
import Authenlize from '../../components/commons/Authenlize'
import React, { lazy, ReactNode, Suspense, useCallback } from 'react'
import {
  PaymentEntity,
  PaymentStatus,
} from '../../services/payment/payment-types'
import Space from '../../components/commons/Space'
import { Button } from '@material-ui/core'
const PaymentForm = lazy(() => import('./PaymentForm'))

const Payment = () => {
  const { data: payments } = useGetPayments()
  const { mutate: confirmPayment } = useConfirmPayment()
  type PaymentType = Exclude<typeof payments, undefined>

  const renderActions = useCallback(
    (data: PaymentType[number]) => {
      const { id: paymentId, status } = data
      return (
        <>
          <Button
            variant="outlined"
            color={'primary'}
            style={{ fontWeight: 'bold' }}
            size="small"
            onClick={() => {
              confirmPayment({
                paymentId,
              })
            }}
            disabled={status !== PaymentStatus.PENDING}
          >
            Confirm
          </Button>
        </>
      )
    },
    [confirmPayment],
  )

  return (
    <Page title={'Payment Management'}>
      {/* <Authenlize roles={[Role.ADMIN, Role.MANAGER]}>
        <Suspense fallback={<div>Loading...</div>}>
          <PaymentForm />
        </Suspense>
      </Authenlize> */}
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
        renderActions={renderActions}
      />
    </Page>
  )
}
export default Payment
