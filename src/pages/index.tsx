import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import { Status, State, Summary, NetworkSummary } from '../@types'
import styles from '../styles/Home.module.css'
import { getData, getNetworkSUmmary, getSummary } from '../utils/getData'
import Logo from '../images/logo.svg'
import Image from 'next/image'

export default function HomePage(): ReactElement {
  const [network, setNetwork] = useState<string>('mainnet')
  const [summary, setSummary] = useState<Summary[]>()
  const [networks, setNetworks] = useState<NetworkSummary[]>()

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

  function networkStyle(currentNet: string) {
    if (currentNet === network) {
      return styles.networkSelected
    } else return styles.networkUnselected
  }

  useEffect(() => {
    async function getStatuses() {
      const statusData = await getData()
      const summaryData = getSummary(network, statusData)
      console.log('summaryData', summaryData)
      if (summaryData) setSummary(summaryData)
      const networkSummary = getNetworkSUmmary(statusData)
      console.log('networkSummary', networkSummary)
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
      <main className={styles.main}>
        <Image src={Logo} height="80rem" />
        {/* <img src={require('../images/logo.svg')} alt="Ocean Protocol Logo" /> */}
        <h1 className={styles.title}>Ocean Status</h1>
        <p className={styles.description}>
          Current Status of Ocean Components{' '}
        </p>
        <div className={styles.grid}>
          {networks && (
            <>
              {networks.map((network: NetworkSummary, i: number) => (
                <button
                  key={i}
                  className={`${styles.network} ${networkStyle(network.name)}`}
                  onClick={() => setNetwork(network.name)}
                >
                  <span>
                    {network.name} {statusIcon(network.status)}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
        <div className={styles.grid}>
          {summary && (
            <>
              {summary.map((value: Summary) => (
                <div
                  key={value.component}
                  className={`${styles.card} ${statusStyle(value.status)}`}
                >
                  <h2>{value?.component}</h2>
                  <p>{value?.status}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
