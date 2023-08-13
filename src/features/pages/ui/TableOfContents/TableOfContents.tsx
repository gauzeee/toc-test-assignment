import { usePagesContext } from '@/entities'

import { ExpandableListItem, Loader } from './parts'

export const TableOfContents = () => {
  const { topLevelIds, loading } = usePagesContext()
  return (
    <ul>
      {loading ? (
        <Loader />
      ) : (
        topLevelIds?.map((pageId) => (
          <ExpandableListItem key={pageId} pageId={pageId} />
        ))
      )}
    </ul>
  )
}
