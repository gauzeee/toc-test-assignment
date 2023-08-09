import { ReactNode } from 'react'
import * as React from 'react'

interface ListItemProps {
  id: string
  children: ReactNode
  handleClick: React.MouseEventHandler<HTMLLIElement> | undefined
}

export const ListItem = ({ id, children, handleClick }: ListItemProps) => {
  return (
    <li key={id} onClick={handleClick} role="button">
      {children}
    </li>
  )
}
