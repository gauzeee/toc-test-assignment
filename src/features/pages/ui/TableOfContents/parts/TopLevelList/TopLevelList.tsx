import { usePagesContext } from '@/features/pages/lib'

import { EmptyList, ExpandableListItem } from '../index'

export const TopLevelList = () => {
  const { topLevelIds, pages, loading } = usePagesContext()
  const isEmpty = !loading && !!pages && !Object.keys(pages).length

  return (
    <>
      <ul data-testid="table-of-contents">
        {topLevelIds?.map((pageId) => (
          <ExpandableListItem key={pageId} pageId={pageId} />
        ))}
      </ul>
      {isEmpty && <EmptyList />}
    </>
  )
}
