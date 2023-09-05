import { useEffect, useState } from 'react'

import { SearchFilter, TableOfContents } from '@/features'
import { ApiResponse } from '@/server/types'
import { apiService } from '@/shared'

import styles from './PagesNavigation.module.css'

export const PagesNavigation = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ApiResponse>()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const data = await apiService.getAllPages()
      if (data) {
        setData(data)
      }
      setLoading(false)
    })()
  }, [])

  return (
    <nav className={styles.pagesNavigation}>
      <SearchFilter disabled={loading} />
      <TableOfContents loading={loading} tocData={data} />
    </nav>
  )
}
