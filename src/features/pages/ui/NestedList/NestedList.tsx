import { clsx } from 'clsx'

import { ExpandableListItem } from '../ExpandableListItem/ExpandableListItem'

import styles from './NestedList.module.css'

export const NestedList = ({
  pagesIds,
  isActive,
}: {
  pagesIds?: string[]
  isActive: boolean
}) => {
  return (
    <ul
      className={clsx(styles.nestedList, isActive && styles.nestedListActive)}
    >
      {pagesIds?.map((pageId) => (
        <ExpandableListItem key={pageId} pageId={pageId} />
      ))}
    </ul>
  )
}
