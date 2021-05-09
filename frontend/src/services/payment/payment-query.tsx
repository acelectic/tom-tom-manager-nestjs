import dayjs from 'dayjs'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { api } from '../../utils/api'
import { USER_URL } from '../user/user-query'
import {
  ConfirmPaymentParams,
  ConfirmPaymentResponse,
  CreatePaymentParams,
  CreatePaymentResponse,
  GetPaymentsParams,
  GetPaymentsResponse,
  PaymentType,
} from './payment-types'

export const PAYMENT_URL = 'payments'

export const useGetPayments = (params?: GetPaymentsParams) => {
  return useQuery([PAYMENT_URL, { params }], async () => {
    const { data } = await api.tomtom.get<GetPaymentsResponse>(
      PAYMENT_URL,
      params,
    )
    const payments = data.payments.map(payment => {
      const { user, resource, transaction, createdAt, ...restPayment } = payment
      return {
        userName: user.name,
        resource: resource ? [resource.name, resource.price].join(', ') : '-',
        transaction: transaction?.ref.toString().padStart(6, '0'),
        ...restPayment,
        date: dayjs(createdAt)
          .tz('Asia/Bangkok')
          .format('DD/MM/YYYY hh:mm:ss'),
      }
    })
    return payments
  })
}

export const useCreatePayment = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: CreatePaymentParams) => {
      const { userId, resourceId, transactionId, type, price } = params
      const { data } = await api.tomtom.post<CreatePaymentResponse>(
        PAYMENT_URL,
        {
          userId,
          type,
          resourceId: type === PaymentType.BUY ? resourceId : undefined,
          transactionId: type === PaymentType.PAID ? transactionId : undefined,
          price: Number(price),
        },
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PAYMENT_URL])
      },
    },
  )
}

export const useConfirmPayment = () => {
  const queryClient = useQueryClient()
  return useMutation(
    async (params: ConfirmPaymentParams) => {
      const { paymentId } = params
      const { data } = await api.tomtom.post<ConfirmPaymentResponse>(
        `${PAYMENT_URL}/${paymentId}/confirm`,
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([PAYMENT_URL])
        queryClient.invalidateQueries([USER_URL])
      },
    },
  )
}
