import Skeleton from 'react-loading-skeleton'
import { clsx } from 'clsx'

import styles from './ListItem.module.css'

export const ListItemSkeleton = () => {
  return (
    <li className={clsx(styles.listItem, styles.listItemSkeleton)}>
      <Skeleton height={14} width={14} />
      <Skeleton height={14} width={200} />
    </li>
  )
}
