import { Page } from '@/server/types'

export type PagesContextValue = {
  pages: Record<string, Page>
  activePagesIds?: string[]
  topLevelIds?: string[]
  loading?: boolean
}
