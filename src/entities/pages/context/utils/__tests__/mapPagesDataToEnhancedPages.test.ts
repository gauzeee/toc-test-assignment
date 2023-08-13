import { describe, expect, it } from 'vitest'

import { Page } from '@/server/types'

import { mapPagesDataToEnhancedPages } from '../mapPagesDataToEnhancedPages'

describe('mapPagesDataToEnhancedPages', () => {
  it('maps pages data to enhanced pages correctly', () => {
    const data = {
      entities: {
        pages: {
          page1: { id: 'page1', parentId: 'ij' } as Page,
          page2: { id: 'page2', parentId: 'page1' } as Page,
          page3: { id: 'page3', parentId: 'page2' } as Page,
        },
      },
      topLevelIds: ['page1'],
    }

    const expectedEnhancedPages = {
      pages: {
        page1: {
          id: 'page1',
          parentId: 'ij',
          allNestedPagesIds: ['page2', 'page3'],
        },
        page2: { id: 'page2', parentId: 'page1', allNestedPagesIds: ['page3'] },
        page3: { id: 'page3', parentId: 'page2' },
      },
      topLevelIds: ['page1'],
    }

    const result = mapPagesDataToEnhancedPages(data)

    expect(result).toEqual(expectedEnhancedPages)
  })

  it('handles missing parent pages gracefully', () => {
    const data = {
      entities: {
        pages: {
          page1: { id: 'page1', parentId: 'missingPage' } as Page,
          page2: { id: 'page2', parentId: 'page1' } as Page,
          page3: { id: 'page3', parentId: 'missingPage' } as Page,
        },
      },
      topLevelIds: ['page1'],
    }

    const expectedEnhancedPages = {
      pages: {
        page1: {
          id: 'page1',
          parentId: 'missingPage',
          allNestedPagesIds: ['page2'],
        },
        page2: { id: 'page2', parentId: 'page1' },
        page3: { id: 'page3', parentId: 'missingPage' },
      },
      topLevelIds: ['page1'],
    }

    const result = mapPagesDataToEnhancedPages(data)

    expect(result).toEqual(expectedEnhancedPages)
  })
})
