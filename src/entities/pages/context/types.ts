import { ApiResponse, Page } from '@/server/types.ts'

export type EnhancedPage = Page & {
  allNestedPagesIds: string[]
}

export interface PagesContextProps {
  pages: Record<string, EnhancedPage>
  topLevelIds: ApiResponse['topLevelIds']
  loading: boolean
  nestedPagesIds?: Record<string, string[]>
}

export type PagesData = Pick<PagesContextProps, 'pages' | 'topLevelIds'>
