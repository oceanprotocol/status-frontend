import React, { useEffect, useState, ReactElement } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import styles from '../styles/Home.module.css'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Chart({
  path,
  title,
  from,
  to
}: {
  path: string
  title: string
  from: number
  to: number
}): ReactElement {
  const [chartData, setChartData] = useState(null)
  console.log('from: ', from)
  console.log('to: ', to)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: title
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `http://localhost:8000${path}?since=${from}&limit=${to}`
      )
      const data = await res.json()
      console.log(data)

      // Assuming the response data is an object with keys as labels and values as data points
      const labels = Object.keys(data)
      const datasetData = Object.values(data)

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'NFTS Published',
            data: datasetData
          }
        ]
      })
    }

    fetchData()
  }, [])

  if (!chartData) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.card}>
      <Bar options={options} data={chartData} className={styles.chart} />
    </div>
  )
}
