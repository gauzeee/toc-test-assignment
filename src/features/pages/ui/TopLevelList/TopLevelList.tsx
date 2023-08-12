import { usePagesContext } from '@/entities'

import { ExpandableListItem } from '../ExpandableListItem/ExpandableListItem.tsx'

import styles from './TopLevelList.module.css'

export const TopLevelList = () => {
  const { topLevelIds, loading } = usePagesContext()

  if (loading) return <div>Loading ...</div>
  return (
    <ul className={styles.topLevelList}>
      {topLevelIds?.map((pageId) => (
        <ExpandableListItem key={pageId} pageId={pageId} />
      ))}
    </ul>
  )
}
