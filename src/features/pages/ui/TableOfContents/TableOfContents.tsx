import { ExpandableListItem } from '../ExpandableListItem/ExpandableListItem'

import styles from './TableOfContents.module.css'

export const TableOfContents = ({
  pagesIds,
  loading,
}: {
  pagesIds: string[]
  loading?: boolean
}) => {
  if (loading) return <div>Loading ...</div>
  return (
    <ul className={styles.topLevelList}>
      {pagesIds?.map((pageId) => (
        <ExpandableListItem key={pageId} pageId={pageId} />
      ))}
    </ul>
  )
}
