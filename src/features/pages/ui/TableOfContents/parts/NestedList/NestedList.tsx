import { clsx } from 'clsx'

import { ExpandableListItem } from '../ExpandableListItem/ExpandableListItem'

import styles from './NestedList.module.css'

export const NestedList = ({
  pagesIds,
  isActive,
  testId,
}: {
  pagesIds?: string[]
  isActive: boolean
  testId?: string
}) => {
  return (
    <ul
      className={clsx(styles.nestedList, isActive && styles.nestedListActive)}
      data-testid={testId}
    >
      {pagesIds?.map((pageId) => (
        <ExpandableListItem key={pageId} pageId={pageId} />
      ))}
    </ul>
  )
}
