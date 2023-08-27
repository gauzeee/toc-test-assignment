import { Page } from '@/server/types'

import { EnhancedPage, EnhancedPages } from '../context'

export const mapPagesToEnhancedPages = (
  pages: Record<string, Page>
): EnhancedPages => {
  if ('enhanced' in pages) return pages as EnhancedPages
  for (const pageId in pages) {
    let page = pages[pageId]
    while (page?.parentId) {
      const parentPage = pages[page.parentId] as EnhancedPage
      if (parentPage) {
        parentPage.allNestedPagesIds = [
          ...(parentPage.allNestedPagesIds || []),
          pageId,
        ]
      }
      page = pages[page.parentId]
    }
  }

  const enhancedPages = pages as EnhancedPages
  enhancedPages.enhanced = true

  return enhancedPages
}
