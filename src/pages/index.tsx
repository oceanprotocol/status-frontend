import Head from 'next/head'
import React, { Fragment, ReactElement, useEffect, useState } from 'react'
import { State, Status } from '../@types'
import styles from '../styles/Home.module.css'
import { getData } from '../utils/getData'
import LogoAsset from '../images/logo.svg'
import CheckAsset from '../images/check.svg'
import GithubAsset from '../images/github.svg'
import addresses from '@oceanprotocol/contracts/addresses/address.json'
import { statusApiUri } from '../../app.config'
import relativeDate from 'tiny-relative-date'

function statusIcon(state: State): ReactElement {
  if (state === State.Normal) {
    return <CheckAsset className={`${styles.icon} ${styles.check}`} />
  } else if (state === State.Outage) {
    return <span className={styles.icon}>🚨</span>
  } else {
    return <span className={styles.icon}>🚧</span>
  }
}

function statusStyle(state: State) {
  if (state === State.Outage) {
    return styles.outage
  } else if (state === State.Degraded) {
    return styles.degraded
  } else {
    return styles.normal
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
      if (!data) setError(`Could not get data from ${statusApiUri}`)
      setData(data)
      setIsloading(false)
    }
    getStatuses()
  }, [])

  return (
    <div className={styles.app}>
      <Head>
        <title>Ocean Protocol Status</title>
        <meta
          name="description"
          content="Status overview of all deployed components hosted by the Ocean Protocol Foundation."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
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

      <main className={styles.content}>
        {isLoading ? (
          <div className={styles.loading}>Loading...</div>
        ) : error ? (
          <div className={styles.loading}>{error}</div>
        ) : (
          Object.entries(data || {}).map(([networkName, value]) => (
            <Fragment key={networkName}>
              <h2 className={styles.networkName}>
                {networkName == 'general' ? null : (
                  <>
                    {networkName}
                    <span
                      className={styles.date}
                      title={`Last update: ${new Date(value.lastUpdatedOn)}`}
                    >
                      {relativeDate(new Date(value.lastUpdatedOn))}
                    </span>
                  </>
                )}
              </h2>
              <div className={styles.grid}>
                {value.components.map((component) => (
                  <div
                    key={component.name}
                    className={`${styles.card} ${statusStyle(
                      component.status
                    )}`}
                  >
                    <h2 className={styles.titleComponent}>
                      {statusIcon(component.status)}{' '}
                      <a
                        href={component.url}
                        title="Go to tested endpoint"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {component.name}
                      </a>
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
                    <footer className={styles.links}>
                      {component.name !== 'data-farming' &&
                        component.name !== 'cexa' && (
                          <a
                            href={`https://github.com/oceanprotocol/${
                              component.name === 'subgraph' ? 'ocean-' : ''
                            }${component.name}`}
                            target="_blank"
                            rel="noreferrer"
                            title="Go to GitHub repository"
                          >
                            <GithubAsset className={styles.icon} />
                          </a>
                        )}
                    </footer>
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
                      ([key, value]: [
                        key: string,
                        value: string | { [key: number]: string }
                      ]) =>
                        key !== 'chainId' &&
                        key !== 'startBlock' && (
                          <li key={key}>
                            <code className={styles.key}>{key}</code>
                            <code>
                              {typeof value === 'string'
                                ? value
                                : JSON.stringify(value, null, 2)}
                            </code>
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
