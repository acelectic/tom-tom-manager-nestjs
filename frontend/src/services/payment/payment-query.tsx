import dayjs from 'dayjs'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { api } from '../../utils/api'
import {
  CreatePaymentParams,
  CreatePaymentResponse,
  GetPaymentsResponse,
  PaymentType,
} from './payment-types'

export const PAYMENT_URL = 'payments'

export const useGetPayments = () => {
  return useQuery([PAYMENT_URL], async () => {
    const { data } = await api.tomtom.get<GetPaymentsResponse>(PAYMENT_URL)
    const payments = data.payments.map((payment) => {
      const { user, resource, transaction, createdAt, ...restPayment } = payment
      return {
        userName: user.name,
        resource: [resource.name, resource.price].join(', '),
        transaction: transaction?.ref.toString().padStart(6, '0'),
        ...restPayment,
        date: dayjs(createdAt).tz('Asia/Bangkok').format('DD/MM/YYYY hh:mm:ss'),
      }
    })
    return payments
  })
}

export const useCreatePayment = () => {
  const queryClient = useQueryClient()
  return useMutation(
    [PAYMENT_URL],
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
