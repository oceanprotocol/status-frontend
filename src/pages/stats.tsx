import React from 'react'
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
// const options = {
//   legend: { display: false },
//   title: {
//     fontFamily: 'sans-serif',
//     display: true,
//     text: 'NFTS Published per week'
//   }
// }

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels: [],
  datasets: [
    {
      label: 'NFTS Published',
      data: {
        '2022-45': 19,
        '2022-46': 45,
        '2022-47': 33,
        '2022-48': 286,
        '2022-49': 96,
        '2022-50': 224,
        '2022-51': 84,
        '2022-52': 35,
        '2023-1': 65,
        '2023-2': 82,
        '2023-3': 59,
        '2023-4': 110,
        '2023-5': 153,
        '2023-6': 117,
        '2023-7': 121,
        '2023-8': 23,
        '2023-9': 37,
        '2023-10': 21,
        '2023-11': 2,
        '2023-12': 10,
        '2023-13': 7,
        '2023-14': 13,
        '2023-15': 0,
        '2023-16': 8,
        '2023-17': 11,
        '2023-18': 11,
        '2023-19': 2
      }
    }
  ]
}

export default function App() {
  return <Bar options={options} data={data} />
}
