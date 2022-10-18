import Head from 'next/head'
import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import { Status, State, Summary, NetworkSummary } from '../@types'
import styles from '../styles/Home.module.css'
import { getData, getNetworkSUmmary, getSummary } from '../utils/getData'
import LogoAsset from '../images/logo.svg'
import Image from 'next/image'

function statusIcon(state: State): string {
  if (state === State.Up) {
    return '✅'
  } else if (state === State.Down) {
    return '🚨'
  } else {
    return '🚧'
  }
}

function statusStyle(state: State) {
  if (state === State.Down) {
    return styles.down
  } else if (state === State.Warning) {
    return styles.warning
  } else {
    return styles.up
  }
}

export default function HomePage(): ReactElement {
  const [network, setNetwork] = useState('mainnet')
  const [summary, setSummary] = useState<Summary[]>()
  const [networks, setNetworks] = useState<NetworkSummary[]>()

  useEffect(() => {
    async function getStatuses() {
      const statusData = await getData()
      const summaryData = getSummary(network, statusData)
      if (summaryData) setSummary(summaryData)
      const networkSummary = getNetworkSUmmary(statusData)
      if (networkSummary) setNetworks(networkSummary)
    }
    getStatuses()
  }, [network])

  return (
    <div className={styles.container}>
      <Head>
        <title>Ocean Protocol Status</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <LogoAsset className={styles.logo} />

        <h1 className={styles.title}>Ocean Status</h1>
        <p className={styles.description}>
          Current Status of Ocean Components{' '}
        </p>
      </header>

      <main>
        {networks?.map((network: NetworkSummary, i: number) => (
          <Fragment key={i}>
            <h2 className={styles.networkName}>{network.name}</h2>

            <div className={styles.grid}>
              {summary?.map((value: Summary) => (
                <div
                  key={value.component}
                  className={`${styles.card} ${statusStyle(value.status)}`}
                >
                  <h2>
                    {statusIcon(value.status)} {value.component}
                  </h2>
                  <code className={styles.version}>{value.version}</code>
                </div>
              ))}
            </div>
          </Fragment>
          // <button
          //   key={i}
          //   className={`${styles.network} ${networkStyle(network.name)}`}
          //   onClick={() => setNetwork(network.name)}
          // >
          //   <span>
          //     {network.name} {statusIcon(network.status)}
          //   </span>
          // </button>
        ))}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
