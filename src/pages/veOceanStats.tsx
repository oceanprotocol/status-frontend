import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LogoAsset from '../images/logo.svg'
import Chart from '../components/Chart'
import stats from '../config/veOceanStats.json'

export default function Stats() {
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
      </header>{' '}
      <main>
        <div className={styles.chartGrid}>
          {stats.map((chart) => (
            <Chart key={chart.title} path={chart.path} title={chart.title} />
          ))}
        </div>
      </main>
    </div>
  )
}
