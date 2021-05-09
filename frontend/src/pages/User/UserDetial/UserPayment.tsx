import { Button } from '@material-ui/core'
import dayjs from 'dayjs'
import { useCallback, useMemo } from 'react'
import BasicList from '../../../components/BasicList'
import Page from '../../../components/commons/Page'
import {
  useGetPayments,
  useConfirmPayment,
} from '../../../services/payment/payment-query'
import { PaymentStatus } from '../../../services/payment/payment-types'
import { usePageRunner } from '../../../utils/custom-hook'

interface UserPaymentProps {
  userId: string
}
const UserPayment = (props: UserPaymentProps) => {
  const { userId } = props
  const { page, pageSize, setNewPage, changePageSize } = usePageRunner({
    alias: {
      page: 'payment-page',
      perPage: 'payment-per-page',
    },
  })

  const { data: paymentsPaginate } = useGetPayments({
    userId,
    page,
    limit: pageSize,
  })
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

  const payments = useMemo(() => {
    return paymentsPaginate
      ? paymentsPaginate?.items.map(payment => {
          const {
            user,
            resource,
            transaction,
            createdAt,
            ...restPayment
          } = payment
          return {
            userName: user.name,
            resource: resource
              ? [resource.name, resource.price].join(', ')
              : '-',
            transaction: transaction?.ref.toString().padStart(6, '0'),
            ...restPayment,
            date: dayjs(createdAt)
              .tz('Asia/Bangkok')
              .format('DD/MM/YYYY hh:mm:ss'),
          }
        })
      : []
  }, [paymentsPaginate])

  return (
    <Page title={'Payment'}>
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
        paginate
        page={page}
        limit={pageSize}
        onChangePage={setNewPage}
        onChangeRowsPerPage={changePageSize}
        total={paymentsPaginate?.meta.totalItems || 0}
      />
    </Page>
  )
}
export default UserPayment
