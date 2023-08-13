import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'

import { apiService } from '@/shared'

import { mapPagesDataToEnhancedPages } from './utils/mapPagesDataToEnhancedPages'
import { PagesContextProps, PagesData } from './types'

export const PagesContext = createContext<PagesContextProps>({
  loading: true,
} as PagesContextProps)

export const PagesProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<PagesData>({ pages: {}, topLevelIds: [] })

  useEffect(() => {
    ;(async () => {
      const data = await apiService.getAllPages()
      if (data) {
        setData(mapPagesDataToEnhancedPages(data))
      }
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
