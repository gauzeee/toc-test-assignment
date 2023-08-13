import { PagesProvider } from '@/entities'
import { TableOfContents } from '@/features'

import styles from './PagesNavigation.module.css'

export const PagesNavigation = () => {
  return (
    <nav className={styles.pagesNavigation}>
      <PagesProvider>
        <TableOfContents />
      </PagesProvider>
    </nav>
  )
}
