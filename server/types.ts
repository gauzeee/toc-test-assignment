export type Page = {
  id: string
  title: string
  url: string
  parentId: string
  level: number
  tabIndex: number
  doNotShowWarningLink: boolean
  pages?: string[]
}

export type ApiResponse = {
  entities: {
    pages: Record<string, Page>
  }
  topLevelIds: string[]
}
