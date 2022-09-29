import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ocean Protocol Status</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Ocean Status
        </h1>

        <p className={styles.description}>
        Current Status of Ocean Components{' '}
          
        </p>

        <div className={styles.grid}>
          <div  className={styles.card}>
            <h2>Aquarius</h2>
            <p>UP</p>
          </div>

          <div  className={styles.card}>
            <h2>Provider</h2>
            <p>UP</p>
          </div>

          <div
            
            className={styles.card}
          >
            <h2>Subgraph</h2>
            <p>UP</p>
          </div>

          <div
            className={styles.card}
          >
            <h2>Market</h2>
            <p>
              UP
            </p>
          </div>
          <div
            className={styles.card}
          >
            <h2>Port</h2>
            <p>
              UP
            </p>
          </div>
          <div
            className={styles.card}
          >
            <h2>Data Farming</h2>
            <p>
              UP
            </p>
          </div>
          <div
            className={styles.card}
          >
            <h2>Operator Service</h2>
            <p>
              UP
            </p>
          </div>
          <div
            className={styles.card}
          >
            <h2>Faucet</h2>
            <p>
              UP
            </p>
          </div>
          <div
            className={styles.card}
          >
            <h2>DAO Grants</h2>
            <p>
              UP
            </p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
       
     
    
      </footer>
    </div>
  )
}

export default Home
