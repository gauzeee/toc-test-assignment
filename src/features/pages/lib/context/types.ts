import { Page } from '@/server/types'

export type EnhancedPage = Page & {
  allNestedPagesIds: string[]
}

export type EnhancedPages = Record<string, EnhancedPage> & {
  enhanced?: boolean
}
