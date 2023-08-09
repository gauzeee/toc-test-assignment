import { usePagesContext } from '@/entities'
import { ExpandableListItem } from './ExpandableListItem'

export const TopLevelPagesList = () => {
  const { data } = usePagesContext()
  return (
    <ul>
      {data?.topLevelIds.map((pageId) => (
        <ExpandableListItem pageId={pageId} />
      ))}
    </ul>
  )
}
