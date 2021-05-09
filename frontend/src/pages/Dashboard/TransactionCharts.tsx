import { useMemo, useState } from 'react'
import {
  useGetTransactions,
  useGetTransactionsHistory,
} from '../../services/transaction/transaction-query'
import { Bar, Line } from 'react-chartjs-2'
import dayjs from 'dayjs'
import { groupBy, now, range, sortBy, sumBy } from 'lodash'
import { SelectField } from '../../components/fields'
import { Form } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'

const colors = ['#91cf96', '#c881d2', '#ffbaa2', '#29b6f6'] as const

const dataSetOpts = {
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'white',
  // backgroundColor: 'rgba(75,192,192,0.4)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  // pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  responsive: true,
}

const TransactionChart = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day'))
  const [endDate, setEndDate] = useState(dayjs())
  const [status, setStatus] = useState()

  const { data: transactions } = useGetTransactionsHistory({
    status,
    // endDate: endDate
    //   .millisecond(0)
    //   .second(0)
    //   .minute(0)
    //   .hour(0)
    //   .toISOString(),
    startDate: startDate
      .millisecond(0)
      .second(0)
      .minute(0)
      .hour(0)
      .toISOString(),
  })

  const transactionsGroupByDate = useMemo(
    () =>
      groupBy(transactions, ({ createdAt }) =>
        dayjs(createdAt).format('DD/MM/YYYY'),
      ),
    [transactions],
  )
  const transactionData = useMemo(() => {
    const start = startDate
    const dateRange = endDate.diff(start, 'day') + 1
    const data = range(dateRange).map(d => {
      const curDate = start.add(d, 'day')
      const transactionByCurDate =
        transactionsGroupByDate[curDate.format('DD/MM/YYYY')]
      const sumPrice = sumBy(transactionByCurDate, ({ price }) => Number(price))
      const sumRemainPrice = sumBy(transactionByCurDate, ({ remain }) =>
        Number(remain),
      )
      const sumUsers = sumBy(transactionByCurDate, ({ users }) =>
        Number(users?.length || 0),
      )
      return {
        date: curDate,
        sumPrice,
        sumRemainPrice,
        sumUsers,
        numTr: transactionByCurDate?.length || 0,
      }
    })
    return sortBy(data, ({ date }) => date)
  }, [endDate, startDate, transactionsGroupByDate])
  // const { data: transactionsHistory } = useGetTransactionsHistory()
  const data = useMemo(() => {
    const data = {
      labels: transactionData
        ? transactionData.map(d => dayjs(d.date).format('DD/MM/YYYY hh:mm'))
        : [],
      datasets: [
        {
          // ...dataSetOpts,
          label: 'Price',
          yAxisID: 'Price',
          borderColor: colors[0],
          pointBorderColor: colors[0],
          pointHoverBackgroundColor: colors[0],
          // pointHoverBorderColor: colors[1],
          data: transactionData ? transactionData.map(d => d.sumPrice) : [],
        },
        {
          // ...dataSetOpts,
          label: 'Remain',
          yAxisID: 'Remain',
          borderColor: colors[1],
          pointBorderColor: colors[1],
          pointHoverBackgroundColor: colors[1],
          // pointHoverBorderColor: colors[1],
          data: transactionData
            ? transactionData.map(d => d.sumRemainPrice)
            : [],
        },
        {
          // ...dataSetOpts,
          label: 'Total User',
          yAxisID: 'TotalUser',
          borderColor: colors[2],
          pointBorderColor: colors[2],
          pointHoverBackgroundColor: colors[2],
          // pointHoverBorderColor: colors[0],
          data: transactionData ? transactionData.map(d => d.sumUsers) : [],
        },
        {
          // ...dataSetOpts,
          label: 'Total Transaction',
          yAxisID: 'TotalUser',
          borderColor: colors[3],
          pointBorderColor: colors[3],
          pointHoverBackgroundColor: colors[3],
          // pointHoverBorderColor: colors[0],
          data: transactionData ? transactionData.map(d => d.numTr) : [],
        },
      ],
    }
    return data
  }, [transactionData])
  const statusOptions = useMemo((): BaseOptions[] => {
    return [
      {
        label: '',
        value: undefined,
      },
      {
        label: 'Pending',
        value: false,
      },
      {
        label: 'Completed',
        value: true,
      },
    ]
  }, [])
  return (
    <div>
      <Form onSubmit={() => {}} subscription={{ values: true }}>
        {() => {
          return (
            <>
              <SelectField
                name="status"
                label="Status"
                options={statusOptions}
              />
              <OnChange name="status">
                {value => {
                  setStatus(value)
                }}
              </OnChange>
            </>
          )
        }}
      </Form>
      <Line
        type="line"
        height={100}
        data={data}
        options={{
          scales: {
            Price: {
              title: {
                text: 'Price',
                display: true,
              },
              type: 'linear',
              position: 'left',
              min: -500,
              max: 3000,
              ticks: {
                stepSize: 100,
                color: colors[0],
              },
            },
            Remain: {
              title: {
                text: 'Remain',
                display: true,
              },
              type: 'linear',
              position: 'left',
              min: -500,
              max: 3000,
              ticks: {
                stepSize: 100,
                color: colors[1],
              },
            },
            TotalUser: {
              title: {
                text: 'TotalUser',
                display: true,
              },
              type: 'linear',
              position: 'right',
              min: 0,
              // max: 5,
              ticks: {
                stepSize: 1,
                color: colors[2],
              },
            },
          },
        }}
      />
    </div>
  )
}
export default TransactionChart
