import {
  forwardRef,
  KeyboardEventHandler,
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

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
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
        data-testid={testId}
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
        style={{
          paddingLeft: 16 * (level + 1) + (hasInnerList ? 0 : 20),
        }}
        {...(hasInnerList && {
          'aria-expanded': isOpen,
        })}
      >
        {hasInnerList && (
          <RightIcon data-testid="right-icon" className={styles.listItemIcon} />
        )}{' '}
        {children}
      </li>
    )
  }
)

ListItem.displayName = 'ListItem'
