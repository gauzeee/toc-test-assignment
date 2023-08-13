import { ExpandableListItem, Loader } from './parts'

export const TableOfContents = ({
  pagesIds,
  loading,
}: {
  pagesIds: string[]
  loading?: boolean
}) => {
  return (
    <ul>
      {loading ? (
        <Loader />
      ) : (
        pagesIds?.map((pageId) => (
          <ExpandableListItem key={pageId} pageId={pageId} />
        ))
      )}
    </ul>
  )
}
