import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from './Menu.module.css'

function MenuLink({ name, path }: { name: string; path: string }) {
  const router = useRouter()

  const classes =
    router?.pathname === path ? `${styles.link} ${styles.active}` : styles.link
  console.log(name, path)
  console.log('classes', classes)
  console.log('router', router.pathname)

  return (
    <Link href={path} className={classes}>
      {name}
    </Link>
  )
}

export default function Menu() {
  return (
    <nav className={styles.menu}>
      <ul className={styles.navigation}>
        <li>
          <MenuLink name="Status" path="/" />
        </li>
        <li>
          <MenuLink name="Core Stats" path="/stats" />
        </li>
        <li>
          <MenuLink name="veOcean Stats" path="/veOceanStats" />
        </li>
      </ul>
    </nav>
  )
}
