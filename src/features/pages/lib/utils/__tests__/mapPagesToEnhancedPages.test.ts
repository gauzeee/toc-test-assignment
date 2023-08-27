import { describe, expect, it } from 'vitest'

import { Page } from '@/server/types'

import { mapPagesToEnhancedPages } from '../mapPagesToEnhancedPages'

describe('mapPagesDataToEnhancedPages', () => {
  it('maps pages data to enhanced pages correctly', () => {
    const data = {
      page1: { id: 'page1', parentId: 'ij' } as Page,
      page2: { id: 'page2', parentId: 'page1' } as Page,
      page3: { id: 'page3', parentId: 'page2' } as Page,
    }

    const expectedEnhancedPages = {
      page1: {
        id: 'page1',
        parentId: 'ij',
        allNestedPagesIds: ['page2', 'page3'],
      },
      page2: { id: 'page2', parentId: 'page1', allNestedPagesIds: ['page3'] },
      page3: { id: 'page3', parentId: 'page2' },
      enhanced: true,
    }

    const result = mapPagesToEnhancedPages(data)

    expect(result).toEqual(expectedEnhancedPages)
  })

  it('handles missing parent pages gracefully', () => {
    const data = {
      page1: { id: 'page1', parentId: 'missingPage' } as Page,
      page2: { id: 'page2', parentId: 'page1' } as Page,
      page3: { id: 'page3', parentId: 'missingPage' } as Page,
    }

    const expectedEnhancedPages = {
      page1: {
        id: 'page1',
        parentId: 'missingPage',
        allNestedPagesIds: ['page2'],
      },
      page2: { id: 'page2', parentId: 'page1' },
      page3: { id: 'page3', parentId: 'missingPage' },
      enhanced: true,
    }

    const result = mapPagesToEnhancedPages(data)

    expect(result).toEqual(expectedEnhancedPages)
  })

  it('return received object without changes if enhanced flag exists', () => {
    const data = {
      page1: { id: 'page1', parentId: 'missingPage' } as Page,
      enhanced: true,
    } as unknown as Record<string, Page>

    const result = mapPagesToEnhancedPages(data)

    expect(result).toEqual(data)
  })
})
