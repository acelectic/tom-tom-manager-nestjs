import { useMemo } from 'react'
import { useGetTransactions } from '../../services/transaction/transaction-query'
import { Bar, Line } from 'react-chartjs-2'
import dayjs from 'dayjs'

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
  const { data: transactions } = useGetTransactions()
  // const { data: transactionsHistory } = useGetTransactionsHistory()
  const data = useMemo(() => {
    const data = {
      labels: transactions
        ? transactions.map(d => dayjs(d.date).format('DD/MM/YYYY hh:mm'))
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
          data: transactions ? transactions.map(d => d.price) : [],
        },
        {
          // ...dataSetOpts,
          label: 'Remain',
          yAxisID: 'Remain',
          borderColor: colors[1],
          pointBorderColor: colors[1],
          pointHoverBackgroundColor: colors[1],
          // pointHoverBorderColor: colors[1],
          data: transactions ? transactions.map(d => d.remain) : [],
        },
        {
          // ...dataSetOpts,
          label: 'Total User',
          yAxisID: 'TotalUser',
          borderColor: colors[2],
          pointBorderColor: colors[2],
          pointHoverBackgroundColor: colors[2],
          // pointHoverBorderColor: colors[0],
          data: transactions ? transactions.map(d => d.totalUser) : [],
        },
      ],
    }
    return data
  }, [transactions])

  return (
    <div>
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
              min: 0,
              max: 1000,
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
              min: 0,
              max: 1000,
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
              max: 5,
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
