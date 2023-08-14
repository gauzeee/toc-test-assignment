import { useEffect, useState } from 'react'

import { TableOfContents } from '@/features'
import { ApiResponse } from '@/server/types'
import { apiService } from '@/shared'

import styles from './PagesNavigation.module.css'

export const PagesNavigation = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ApiResponse>()

  useEffect(() => {
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
      <TableOfContents
        loading={loading}
        pages={data?.entities?.pages}
        topLevelIds={data?.topLevelIds}
      />
    </nav>
  )
}
