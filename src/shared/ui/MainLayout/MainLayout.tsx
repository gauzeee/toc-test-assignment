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
      <header data-testid="app-header" className={styles.header}>
        {headerSlot}
      </header>
      <aside data-testid="app-aside" className={styles.aside}>
        {asideSlot}
      </aside>
      <main data-testid="app-main" className={styles.main}>
        {mainSlot}
      </main>
      <footer data-testid="app-footer" className={styles.footer}>
        {footerSlot}
      </footer>
    </>
  )
}
