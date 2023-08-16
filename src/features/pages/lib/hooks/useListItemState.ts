import { usePagesContext } from '../context'

export const useListItemState = (pageId: string, hash: string) => {
  const pages = usePagesContext()
  const page = pages[pageId]
  const hasInnerList = !!page?.pages?.length
  const isActive = pageId === hash
  const isActiveParent = page?.allNestedPagesIds?.includes(hash) ?? false

  const activePage = pages[hash]
  const showBacklight =
    (isActiveParent && page?.level === 0) || pageId === activePage?.parentId

  return {
    page,
    hasInnerList,
    isActive,
    isActiveParent,
    showBacklight,
  }
}
