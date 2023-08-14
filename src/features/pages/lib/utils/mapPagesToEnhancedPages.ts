import { Page } from '@/server/types'

import { EnhancedPage } from '../context'

export const mapPagesToEnhancedPages = (
  pages: Record<string, Page>
): Record<string, EnhancedPage> => {
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

  return pages as Record<string, EnhancedPage>
}
