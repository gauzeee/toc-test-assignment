import { Page } from '@/server/types.ts'

export type EnhancedPage = Page & {
  allNestedPagesIds: string[]
}

export type EnhancedPages = Record<string, EnhancedPage>
