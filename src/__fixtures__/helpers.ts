import { vi } from 'vitest'

import { Page } from '@/server/types'

type MockPayload = {
  entities: { pages: Record<string, Partial<Page>> }
  topLevelIds?: string[]
}

let mock: MockPayload = {
  entities: {
    pages: {
      page1: { id: 'page1', title: 'Page 1', level: 0, parentId: '' },
      page2: { id: 'page2', title: 'Page 2', level: 0, parentId: '' },
    },
  },
  topLevelIds: ['page1', 'page2'],
}
export const mockApiService = (customPayload?: MockPayload) => {
  if (customPayload) mock = customPayload
  vi.mock('@/shared', async () => {
    const mod = await vi.importActual('@/shared')
    return {
      ...(mod as NonNullable<unknown>),
      apiService: {
        getAllPages: async () => {
          return Promise.resolve(mock)
        },
      },
    }
  })
}
