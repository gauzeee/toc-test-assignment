import { ApiResponse } from '@/server/types'

import { EnhancedPage, PagesData } from '../types'

export const mapPagesDataToEnhancedPages = (data: ApiResponse): PagesData => {
  const {
    entities: { pages },
    topLevelIds,
  } = data

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

  return {
    pages,
    topLevelIds,
  } as PagesData
}
