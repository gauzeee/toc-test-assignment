import { useMemo } from 'react'

import { Page } from '@/server/types'

import { mapPagesToEnhancedPages, PagesContext } from '../../lib'

import { EmptyList, ExpandableListItem, Loader } from './parts'

interface TableOfContentsProps {
  topLevelIds?: string[]
  loading?: boolean
  pages?: Record<string, Page>
}

export const TableOfContents = ({
  loading,
  topLevelIds,
  pages,
}: TableOfContentsProps) => {
  const enhancedPages = useMemo(
    () => (pages ? mapPagesToEnhancedPages(pages) : {}),
    [pages]
  )

  const isLoading = loading && !pages
  const isEmpty = !loading && !pages

  return (
    <>
      <ul data-testid="table-of-contents">
        {isLoading ? (
          <Loader />
        ) : (
          <PagesContext.Provider value={enhancedPages}>
            {topLevelIds?.map((pageId) => (
              <ExpandableListItem key={pageId} pageId={pageId} />
            ))}
          </PagesContext.Provider>
        )}
      </ul>
      {isEmpty && <EmptyList />}
    </>
  )
}
