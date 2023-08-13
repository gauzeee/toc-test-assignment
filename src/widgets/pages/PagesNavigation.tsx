import { usePagesContext } from '@/entities'
import { TableOfContents } from '@/features'

import styles from './PagesNavigation.module.css'

export const PagesNavigation = () => {
  const { topLevelIds, loading } = usePagesContext()

  return (
    <nav className={styles.pagesNavigation}>
      <TableOfContents pagesIds={topLevelIds} loading={loading} />
    </nav>
  )
}
