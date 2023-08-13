import { usePagesContext } from '@/entities'
import { TableOfContents } from '@/features'

export const PagesNavigation = () => {
  const { topLevelIds, loading } = usePagesContext()

  return (
    <nav>
      <TableOfContents pagesIds={topLevelIds} loading={loading} />
    </nav>
  )
}
