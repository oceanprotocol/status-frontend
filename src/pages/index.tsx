import Head from 'next/head'
import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import { State, Status } from '../@types'
import styles from '../styles/Home.module.css'
import { getData } from '../utils/getData'
import LogoAsset from '../images/logo.svg'
import CheckAsset from '../images/check.svg'
import addresses from '@oceanprotocol/contracts/addresses/address.json'
import { statusApiUri } from '../../app.config'

function statusIcon(state: State): ReactElement {
  if (state === State.Up) {
    return <CheckAsset className={`${styles.icon} ${styles.check}`} />
  } else if (state === State.Down) {
    return <span className={styles.icon}>🚨</span>
  } else {
    return <span className={styles.icon}>🚧</span>
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
  const [data, setData] = useState<{ [key: string]: Status }>()
  const [isLoading, setIsloading] = useState<boolean>()
  const [error, setError] = useState<string>()

  useEffect(() => {
    async function getStatuses() {
      setIsloading(true)
      const data = await getData()
      if (!data) setError(`Could not fetch data from ${statusApiUri}`)
      setData(data)
      setIsloading(false)
    }
    getStatuses()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Ocean Protocol Status</title>
        <meta
          name="description"
          content="Status overview of all deployed components hosted by the Ocean Protocol Foundation."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <LogoAsset className={styles.logo} />

        <h1 className={styles.title}>Ocean Protocol Status</h1>
        <p className={styles.description}>
          Status overview of all{' '}
          <a href="https://docs.oceanprotocol.com/core-concepts/networks">
            deployed components
          </a>{' '}
          hosted by the Ocean Protocol Foundation.
        </p>
      </header>

      <main>
        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : error ? (
          <div className={styles.loading}>{error}</div>
        ) : (
          Object.entries(data || {}).map(([networkName, value]) => (
            <Fragment key={networkName}>
              <h2 className={styles.networkName}>{networkName}</h2>
              <div className={styles.grid}>
                {value.components.map((component) => (
                  <div
                    key={component.name}
                    className={`${styles.card} ${statusStyle(
                      component.status
                    )}`}
                  >
                    <h2 className={styles.titleComponent}>
                      {statusIcon(component.status)} {component.name}
                      <code className={styles.version} title="deployed version">
                        {component.version}
                      </code>
                    </h2>

                    {component.statusMessages?.length ? (
                      <ul className={styles.messages}>
                        {component.statusMessages.map(
                          (message: string, i: number) => (
                            <li key={i} className={styles.statusMessage}>
                              {message}
                            </li>
                          )
                        )}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>

              {networkName !== 'general' && (
                <details className={styles.contracts}>
                  <summary>
                    <h3 className={styles.titleComponent}>
                      Deployed Contracts
                    </h3>
                  </summary>
                  <ul>
                    {Object.entries((addresses as any)[networkName]).map(
                      ([key, value]) =>
                        key !== 'chainId' &&
                        key !== 'startBlock' && (
                          <li key={key}>
                            <code className={styles.key}>{key}</code>:{' '}
                            <code>{JSON.stringify(value)}</code>
                          </li>
                        )
                    )}
                  </ul>
                </details>
              )}
            </Fragment>
          ))
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}
