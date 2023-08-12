import {
  forwardRef,
  KeyboardEventHandler,
  memo,
  MouseEventHandler,
  ReactNode,
} from 'react'
import { clsx } from 'clsx'

import { RightIcon } from '@/shared'

import styles from './ListItem.module.css'

interface ListItemProps {
  level: number
  hasInnerList?: boolean
  children: ReactNode
  handleClick?: MouseEventHandler<HTMLLIElement>
  handleKeyUp?: KeyboardEventHandler<HTMLLIElement>
  isActive?: boolean
  isOpen?: boolean
  testId?: string
  showBacklight?: boolean
}

export const ListItem = memo(
  forwardRef<HTMLLIElement, ListItemProps>(
    (
      {
        children,
        handleClick,
        handleKeyUp,
        hasInnerList,
        level,
        isActive,
        isOpen,
        testId,
        showBacklight,
      },
      ref
    ) => {
      return (
        <li
          data-test-id={testId}
          ref={ref}
          onClick={handleClick}
          onKeyUp={handleKeyUp}
          role="button"
          tabIndex={0}
          className={clsx(
            styles.listItem,
            isActive && styles.listItemActive,
            isOpen && styles.listItemExpanded,
            showBacklight && styles.listItemBacklight
          )}
          aria-expanded={isOpen}
          style={{
            paddingLeft: 16 * (level + 1) + (hasInnerList ? 0 : 20),
          }}
        >
          {hasInnerList && <RightIcon className={styles.listItemIcon} />}{' '}
          {children}
        </li>
      )
    }
  )
)

ListItem.displayName = 'ListItem'
