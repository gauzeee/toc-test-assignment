import {
  KeyboardEvent,
  SyntheticEvent,
  useCallback,
  useRef,
  useState,
} from 'react'

import { usePagesContext } from '@/entities'
import {
  ListItem,
  setDocumentTitle,
  useLocationHash,
  useScrollToElementOnInitialRender,
} from '@/shared'

import { NestedList } from '../NestedList/NestedList'
export const ExpandableListItem = ({ pageId }: { pageId: string }) => {
  const { pages } = usePagesContext()
  const page = pages?.[pageId]
  const { hash, updateHash } = useLocationHash()
  const hasInnerList = !!page?.pages?.length
  const isActive = `#${pageId}` === hash
  const isActiveParent =
    page?.allNestedPagesIds?.includes(hash.slice(1)) ?? false
  const [isOpen, setIsOpen] = useState(isActiveParent || isActive)
  const listItemRef = useRef<HTMLLIElement>(null)

  useScrollToElementOnInitialRender(isActive, listItemRef?.current)

  const onSelectElement = useCallback(() => {
    setIsOpen((prev) => !prev)
    updateHash(pageId)
    setDocumentTitle(page?.title)
  }, [page?.title, pageId, updateHash])

  const handleClick = useCallback(
    (e: SyntheticEvent<HTMLLIElement>) => {
      e.stopPropagation()
      onSelectElement()
    },
    [onSelectElement]
  )

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLLIElement>) => {
      if (e.key === 'Enter') {
        onSelectElement()
      }
    },
    [onSelectElement]
  )

  const showBacklight = (isActiveParent && page?.level === 0) || isActive

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
        <NestedList pagesIds={page?.pages} isActive={isActiveParent} />
      )}
    </>
  )
}
