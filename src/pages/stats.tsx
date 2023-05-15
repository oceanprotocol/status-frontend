import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import LogoAsset from '../images/logo.svg'
import Chart from '../components/Chart'
import stats from '../config/coreStats.json'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Stats() {
  const now = new Date()
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(now.getMonth() - 6)
  const [from, setFrom] = useState(sixMonthsAgo)
  const [to, setTo] = useState(now)

  return (
    <div className={styles.app}>
      <Head>
        <title>Ocean Protocol Stats</title>
        <meta
          name="description"
          content="Status overview of all deployed components hosted by the Ocean Protocol Foundation."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <LogoAsset className={styles.logo} />
        <h1 className={styles.title}>Ocean Protocol Stats</h1>
        <p className={styles.description}>
          Core stats for usage of Ocean Protocol.
        </p>
        <div className={styles.dateSelection}>
          From:{' '}
          <DatePicker
            selected={from}
            dateFormat="do LLL y"
            onChange={(date) => setFrom(date)}
          />
          To:{' '}
          <DatePicker
            selected={to}
            dateFormat="do LLL y"
            onChange={(date) => setTo(date)}
          />
        </div>
      </header>{' '}
      <main>
        <div className={styles.chartGrid}>
          {stats.map((chart) => (
            <Link href={`/stats/${chart.name}`} key={chart.title}>
              <Chart
                key={chart.title}
                path={chart.path}
                title={chart.title}
                from={from}
                to={to}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
