import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { ScaleChartOptions } from 'chart.js'
import deepmerge from 'deepmerge'

interface LineScalesOption extends DeepPartial<ScaleChartOptions['scales']> {}
interface TransactionChartProps<T, K extends keyof T> {
  data: T[]
  xAixKey: K
  renderOptions: {
    key: K
    label: string
    color: string
  }[]
  chartOption?: LineScalesOption
}
const TransactionChart = <T, K extends keyof T>(
  props: TransactionChartProps<T, K>,
) => {
  const { data, renderOptions, xAixKey, chartOption = {} } = props
  // const { data: transactionsHistory } = useGetTransactionsHistory()

  const datasets = useMemo(() => {
    return renderOptions.map(({ label, key, color }) => {
      return {
        label: label,
        yAxisID: key,
        borderColor: color,
        pointBorderColor: color,
        pointHoverBackgroundColor: color,
        data: data.map(d => d[key]),
      }
    })
  }, [data, renderOptions])

  const chartData = useMemo(() => {
    return {
      labels: data.map(d => d[xAixKey]),
      datasets: datasets,
    }
  }, [data, datasets, xAixKey])

  const scalesOptions = useMemo(() => {
    const baseScales: LineScalesOption = {}
    renderOptions.forEach(({ key, color, label }) => {
      const yAxisKey = key as string
      baseScales[yAxisKey] = {
        title: {
          text: label,
          display: true,
        },
        type: 'linear',
        position: 'left',
        // min: -500,
        // max: 3000,
        ticks: {
          //   stepSize: 100,
          color,
        },
      }
    })
    return deepmerge(baseScales, chartOption)
  }, [chartOption, renderOptions])
  console.log({ chartData, scalesOptions })
  return (
    <Line
      type="line"
      height={100}
      data={chartData}
      options={{
        scales: scalesOptions,
      }}
    />
  )
}
export default TransactionChart
