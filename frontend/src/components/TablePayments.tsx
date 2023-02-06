import { Button } from '@material-ui/core'
import dayjs from 'dayjs'
import { useCallback, useMemo } from 'react'
import { Role } from '../services/auth/auth-types'
import {
  useConfirmPayment,
  useGetPayments,
} from '../services/payment/payment-query'
import { PaymentStatus } from '../services/payment/payment-types'
import { usePageRunner, useSnackbar } from '../utils/custom-hook'
import { numberWithCommas } from '../utils/helper'
import BasicList from './BasicList'
import Authorize from './commons/Authorize'
import Page from './commons/Page'

interface TablePaymentsProps {
  transactionId?: string
  userId?: string
}
const TablePayments = (props: TablePaymentsProps) => {
  const { transactionId, userId } = props
  const { page, pageSize, setNewPage, changePageSize } = usePageRunner({
    alias: {
      page: 'payment-page',
      perPage: 'payment-per-page',
    },
  })
  const { mutate: confirmPayment } = useConfirmPayment()
  const { snackbar } = useSnackbar()

  const { data: paymentsPaginate } = useGetPayments({
    userId,
    transactionId,
    page,
    limit: pageSize,
  })

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

  type PaymentType = Exclude<typeof payments, undefined>

  const renderActions = useCallback(
    (data: PaymentType[number]) => {
      const { id: paymentId, status, userName, price } = data
      return (
        <Authorize roles={[Role.ADMIN, Role.MANAGER]} allowLocalAdmin>
          <Button
            variant="outlined"
            color={'primary'}
            style={{ fontWeight: 'bold' }}
            size="small"
            onClick={() => {
              confirmPayment(
                {
                  paymentId,
                },
                {
                  onSuccess: () => {
                    snackbar({
                      type: 'success',
                      message: `Confirmr Payment: ${userName}, Price: ${numberWithCommas(
                        price,
                      )}`,
                    })
                  },
                },
              )
            }}
            disabled={status !== PaymentStatus.PENDING}
          >
            Confirm
          </Button>
        </Authorize>
      )
    },
    [confirmPayment],
  )

  return (
    <Page title={'Payment'}>
      <BasicList
        data={payments}
        columns={['ref', 'userName', 'price', 'transaction', 'date', 'status']}
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
export default TablePayments
