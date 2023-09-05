import { ApiResponse } from '@/server/types'

import { PagesProvider } from '../../lib'

import { TopLevelList } from './parts/TopLevelList/TopLevelList'

type TableOfContentsProps = {
  loading?: boolean
  tocData?: ApiResponse
}

export const TableOfContents = ({ loading, tocData }: TableOfContentsProps) => {
  return (
    <PagesProvider tocData={tocData} loading={loading}>
      <TopLevelList />
    </PagesProvider>
  )
}
