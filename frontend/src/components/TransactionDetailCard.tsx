import { Grid, Paper } from '@material-ui/core'
import { capitalize, isNumber } from 'lodash'
import Space from './commons/Space'
import Text from './commons/Text'
import { numberWithCommas } from '../utils/helper'
import { useGetUser } from '../services/user/user-query'
import {
  modifyTransaction,
  useGetTransaction,
} from '../services/transaction/transaction-query'
import { useMemo } from 'react'

interface TransactionDetailCardProps {
  transactionId?: string
}
const TransactionDetailCard = (props: TransactionDetailCardProps) => {
  const { transactionId } = props
  const { data: transaction } = useGetTransaction({
    transactionId,
  })
  const customTransaction = useMemo(
    () => transaction && modifyTransaction(transaction),
    [transaction],
  )
  const { ref, price, remain, totalUser } = customTransaction || {}

  return (
    <Paper variant="elevation" elevation={5} style={{ padding: 20 }}>
      <Grid container direction="row" spacing={4}>
        <Grid item md={3}>
          <Text>{`Ref: ${ref ? capitalize(ref) : '-'}`}</Text>
        </Grid>

        <Grid item md={3}>
          <Text>{`TotalUser: ${totalUser ? totalUser : '-'}`}</Text>
        </Grid>
        <Grid item md={3}>
          <Text>{`Price: ${
            isNumber(price) ? numberWithCommas(price) : '-'
          }`}</Text>
        </Grid>
        <Grid item md={3}>
          <Text>{`Remain: ${
            isNumber(remain) ? numberWithCommas(remain) : '-'
          }`}</Text>
        </Grid>
      </Grid>
    </Paper>
  )
}
export default TransactionDetailCard
