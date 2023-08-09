import { ListItem } from '@/shared'
import { usePagesContext } from '@/entities'
import { SyntheticEvent, useState } from 'react'

export const ExpandableListItem = ({ pageId }: { pageId: string }) => {
  const { data } = usePagesContext()
  const page = data?.entities?.pages?.[pageId]
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = (e: SyntheticEvent<HTMLLIElement>) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  return page ? (
    <ListItem id={pageId} handleClick={handleClick}>
      {page.title}
      {!!page?.pages?.length && isOpen && (
        <ul>
          {page?.pages?.map((pageId) => <ExpandableListItem pageId={pageId} />)}
        </ul>
      )}
    </ListItem>
  ) : null
}
