import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'

import { ApiResponse } from '@/server/types'

import { EnhancedPage, PagesContextProps, PagesData } from './types'

export const PagesContext = createContext<PagesContextProps>({
  loading: true,
} as PagesContextProps)

const loadPages = async () => {
  try {
    const response = await fetch('http://localhost:4000/')
    return await response.json()
  } catch (e) {
    console.error(e)
  }
}

const mapPagesDataToEnhancedPages = (data: ApiResponse): PagesData => {
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

export const PagesProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<PagesData>({ pages: {}, topLevelIds: [] })

  useEffect(() => {
    ;(async () => {
      const data = await loadPages()
      setData(mapPagesDataToEnhancedPages(data))
      setLoading(false)
    })()
  }, [])

  const contextValue = useMemo(
    () => ({
      loading,
      pages: data.pages,
      topLevelIds: data.topLevelIds,
    }),
    [data, loading]
  )

  return (
    <PagesContext.Provider value={contextValue}>
      {children}
    </PagesContext.Provider>
  )
}
