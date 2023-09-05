import { KeyboardEvent, SyntheticEvent, useEffect, useState } from 'react'

import { setDocumentTitle, useLocationHash, useSearchParams } from '@/shared'

import { usePagesContext } from '../context'

export const useListItemState = (pageId: string) => {
  const { pages, activePagesIds } = usePagesContext()
  const { hash, updateHash } = useLocationHash()
  const { searchParams } = useSearchParams()
  const searchString = searchParams.get('q')
  const page = pages[pageId]
  const hasInnerList = !!page?.pages?.length
  const isActive = pageId === hash
  const isActiveParent = activePagesIds?.includes(pageId) ?? false

  const [isOpen, setIsOpen] = useState(isActiveParent || isActive)

  useEffect(() => {
    if (searchString && (isActive || isActiveParent)) {
      setIsOpen(true)
    }
  }, [isActive, isActiveParent, searchString])

  const activePage = pages?.[hash]
  const showBacklight =
    (isActiveParent && page?.level === 0) || pageId === activePage?.parentId

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

  return {
    page,
    hasInnerList,
    isActive,
    isOpen,
    showBacklight,
    handleClick,
    handleKeyUp,
  }
}
