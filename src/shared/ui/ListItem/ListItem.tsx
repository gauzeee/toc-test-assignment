import { MouseEventHandler, ReactNode } from 'react'
import { clsx } from 'clsx'

import { RightIcon } from '@/shared'

import styles from './ListItem.module.css'

interface ListItemProps {
  level: number
  hasInnerList?: boolean
  children: ReactNode
  handleClick: MouseEventHandler<HTMLLIElement> | undefined
  isActive?: boolean
  isOpen?: boolean
}

export const ListItem = ({
  children,
  handleClick,
  hasInnerList,
  level,
  isActive,
  isOpen,
}: ListItemProps) => {
  return (
    <li
      onClick={handleClick}
      role="button"
      className={clsx(
        styles.listItem,
        isActive && styles.listItemActive,
        isOpen && styles.listItemExpanded
      )}
      style={{
        paddingLeft: 22 * (level + 1) + (hasInnerList ? 0 : 20),
      }}
    >
      {hasInnerList && <RightIcon className={styles.listItemIcon} />} {children}
    </li>
  )
}
