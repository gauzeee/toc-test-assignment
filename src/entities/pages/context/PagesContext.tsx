import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { PagesContextProps } from './types'
import { ApiResponse } from '@/server/types'

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

export const PagesProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ApiResponse>()

  useEffect(() => {
    ;(async () => {
      const pages = await loadPages()
      setData(pages)
      setLoading(false)
    })()
  }, [])

  const contextValue = useMemo(
    () => ({
      loading,
      data,
    }),
    [data, loading]
  )

  return (
    <PagesContext.Provider value={contextValue}>
      {children}
    </PagesContext.Provider>
  )
}
