import dayjs from 'dayjs'
import { groupBy } from 'lodash'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { api } from '../../utils/api'
import { numberWithCommas } from '../../utils/helper'
import {
  CreateTransactionParams,
  CreateTransactionResponse,
  GetTransactionsHistoryResponse,
  GetTransactionsParams,
  GetTransactionsResponse,
  TransactionEntity,
} from './transaction-types'

export const TRANSACTION_URL = 'transactions'
export const TRANSACTION_HISTORY_URL = `${TRANSACTION_URL}/history`

export const useGetTransactions = (params?: GetTransactionsParams) => {
  return useQuery([TRANSACTION_URL, params], async () => {
    const { data } = await api.tomtom.get<GetTransactionsResponse>(
      TRANSACTION_URL,
      params,
    )
    const transactions = data.transactions.map(modifyTransaction)
    return transactions
  })
}

export const useGetTransactionsHistory = () => {
  return useQuery([TRANSACTION_URL, TRANSACTION_HISTORY_URL], async () => {
    const { data } = await api.tomtom.get<GetTransactionsHistoryResponse>(
      TRANSACTION_HISTORY_URL,
    )
    const modify = data.transactions.map(modifyTransaction)

    const transactions = groupBy(modify, ({ date }) =>
      dayjs(date).format('DD/MM/YYYY hh:mm'),
    )
    return transactions
  })
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  return useMutation(
    [TRANSACTION_URL],
    async (params: CreateTransactionParams) => {
      const { userIds, resourceIds, price } = params
      const { data } = await api.tomtom.post<CreateTransactionResponse>(
        TRANSACTION_URL,
        {
          userIds,
          resourceIds,
          price: numberWithCommas(Number(price)),
        },
      )
      return data
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TRANSACTION_URL])
      },
    },
  )
}

const modifyTransaction = (transaction: TransactionEntity) => {
  const {
    ref,
    users,
    resources,
    createdAt,
    completed,
    ...restTransactoion
  } = transaction
  return {
    ...restTransactoion,
    ref: ref.toString().padStart(6, '0'),
    totalUser: users?.length || 0,
    completed: completed ? 'Completed' : 'Pending',
    date: dayjs(createdAt)
      .tz('Asia/Bangkok')
      .format('DD/MM/YYYY hh:mm:ss'),
  }
}
