import { KeyboardEvent, memo, SyntheticEvent, useRef, useState } from 'react'

import { ListItem, usePagesContext } from '@/entities'
import {
  setDocumentTitle,
  useLocationHash,
  useScrollToElementOnInitialRender,
} from '@/shared'

import { NestedList } from '../NestedList/NestedList'
export const ExpandableListItem = memo(({ pageId }: { pageId: string }) => {
  const { pages } = usePagesContext()
  const page = pages?.[pageId]
  const { hash, updateHash } = useLocationHash()
  const hasInnerList = !!page?.pages?.length
  const isActive = `#${pageId}` === hash
  const isActiveParent =
    page?.allNestedPagesIds?.includes(hash.slice(1)) ?? false
  const [isOpen, setIsOpen] = useState(isActiveParent || isActive)
  const listItemRef = useRef<HTMLLIElement>(null)
  const activePage = pages?.[hash.slice(1)]

  useScrollToElementOnInitialRender(isActive, listItemRef?.current)

  const onSelectElement = () => {
    setIsOpen((prev) => !prev)
    updateHash(pageId)
    setDocumentTitle(page?.title)
  }

  const handleClick = (e: SyntheticEvent<HTMLLIElement>) => {
    e.stopPropagation()
    onSelectElement()
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter') {
      onSelectElement()
    }
  }

  const showBacklight =
    (isActiveParent && page?.level === 0) ||
    pageId === activePage?.parentId ||
    isActive

  return (
    <>
      <ListItem
        handleClick={handleClick}
        handleKeyUp={handleKeyUp}
        hasInnerList={hasInnerList}
        level={page.level}
        isActive={isActive}
        showBacklight={showBacklight}
        isOpen={isOpen}
        ref={listItemRef}
        testId={pageId}
      >
        {page.title}
      </ListItem>
      {hasInnerList && isOpen && (
        <NestedList pagesIds={page.pages} isActive={showBacklight} />
      )}
    </>
  )
})
