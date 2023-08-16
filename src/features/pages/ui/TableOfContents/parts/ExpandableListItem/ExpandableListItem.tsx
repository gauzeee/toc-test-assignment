import { KeyboardEvent, SyntheticEvent, useRef, useState } from 'react'

import { ListItem } from '@/entities'
import { useListItemState } from '@/features/pages/lib'
import {
  AnimateHeight,
  setDocumentTitle,
  useLocationHash,
  useScrollToElementOnInitialRender,
} from '@/shared'

import { NestedList } from '../NestedList/NestedList'
export const ExpandableListItem = ({ pageId }: { pageId: string }) => {
  const { hash, updateHash } = useLocationHash()
  const { page, showBacklight, isActiveParent, isActive, hasInnerList } =
    useListItemState(pageId, hash)
  const [isOpen, setIsOpen] = useState(isActiveParent || isActive)
  const listItemRef = useRef<HTMLLIElement>(null)

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
        testId={`${pageId}-list-item`}
      >
        {page.title}
      </ListItem>
      {hasInnerList && (
        <AnimateHeight isOpen={isOpen}>
          <NestedList
            pagesIds={page.pages}
            isActive={showBacklight}
            testId={`${pageId}-nested-list`}
          />
        </AnimateHeight>
      )}
    </>
  )
}
