import { SyntheticEvent, useState } from 'react'

import { usePagesContext } from '@/entities'
import { ListItem, useLocationHash } from '@/shared'

export const ExpandableListItem = ({ pageId }: { pageId: string }) => {
  const { data } = usePagesContext()
  const page = data?.entities?.pages?.[pageId]
  const [isOpen, setIsOpen] = useState(false)
  const { hash, updateHash } = useLocationHash()

  const hasInnerList = !!page?.pages?.length
  const isActive = `#${pageId}` === hash

  const handleClick = (e: SyntheticEvent<HTMLLIElement>) => {
    e.stopPropagation()
    setIsOpen((prev) => !prev)
    updateHash(pageId)
  }

  return page ? (
    <>
      <ListItem
        handleClick={handleClick}
        hasInnerList={hasInnerList}
        level={page.level}
        isActive={isActive}
        isOpen={isOpen}
      >
        {page.title}
      </ListItem>
      {hasInnerList && isOpen && (
        <ul>
          {page?.pages?.map((pageId) => (
            <ExpandableListItem key={pageId} pageId={pageId} />
          ))}
        </ul>
      )}
    </>
  ) : null
}
