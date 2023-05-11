import { State } from '../@types'
import { ReactElement } from 'react'
import CheckAsset from '../images/check.svg'
import styles from '../styles/Home.module.css'

export function statusIcon(state: State): ReactElement {
  if (state === State.Normal) {
    return <CheckAsset className={`${styles.icon} ${styles.check}`} />
  } else if (state === State.Outage) {
    return <span className={styles.icon}>🚨</span>
  } else {
    return <span className={styles.icon}>🚧</span>
  }
}

export function statusStyle(state: State) {
  if (state === State.Outage) {
    return styles.outage
  } else if (state === State.Degraded) {
    return styles.degraded
  } else {
    return styles.normal
  }
}
