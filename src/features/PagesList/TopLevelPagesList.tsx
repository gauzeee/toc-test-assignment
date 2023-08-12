import { usePagesContext } from '@/entities'

import { ExpandableListItem } from './ExpandableListItem'

import styles from './PagesList.module.css'

export const TopLevelPagesList = () => {
  const { data } = usePagesContext()
  return (
    <ul className={styles.topLevelList}>
      {data?.topLevelIds.map((pageId) => (
        <ExpandableListItem key={pageId} pageId={pageId} />
      ))}
    </ul>
  )
}
