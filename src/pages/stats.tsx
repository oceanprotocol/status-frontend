import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart'
    }
  }
}

export default function Stats() {
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:8000/stats/core/publishedNFT')
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

  return <Bar options={options} data={chartData} />
}
