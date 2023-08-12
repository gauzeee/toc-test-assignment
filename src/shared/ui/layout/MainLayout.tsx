import { ReactNode } from 'react'

import styles from './MainLayout.module.css'

interface MainLayoutProps {
  asideSlot: ReactNode
  mainSlot: ReactNode
  headerSlot: ReactNode
  footerSlot: ReactNode
}
export const MainLayout = ({
  asideSlot,
  mainSlot,
  headerSlot,
  footerSlot,
}: MainLayoutProps) => {
  return (
    <>
      <header className={styles.header}>{headerSlot}</header>
      <aside className={styles.aside}>{asideSlot}</aside>
      <main className={styles.main}>{mainSlot}</main>
      <footer className={styles.footer}>{footerSlot}</footer>
    </>
  )
}
