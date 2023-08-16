import { useEffect, useState } from 'react'

import { SearchFilter, TableOfContents } from '@/features'
import { ApiResponse } from '@/server/types'
import { apiService, useSearchParams } from '@/shared'

import styles from './PagesNavigation.module.css'

export const PagesNavigation = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ApiResponse>()
  const { searchParams } = useSearchParams()
  const searchString = searchParams.get('q')

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const data = searchString
        ? await apiService.searchPages(searchString)
        : await apiService.getAllPages()
      if (data) {
        setData(data)
      }
      setLoading(false)
    })()
  }, [searchString])

  return (
    <nav className={styles.pagesNavigation}>
      <SearchFilter disabled={loading} />
      <TableOfContents
        loading={loading}
        pages={data?.entities?.pages}
        topLevelIds={data?.topLevelIds}
      />
    </nav>
  )
}
