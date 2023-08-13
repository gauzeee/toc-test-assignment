import { assert, describe, it, vi } from 'vitest'

import { ApiResponse } from '@/server/types'

import ApiService from '../ApiService'

const pagesMock: ApiResponse = {
  topLevelIds: ['a', 'b', 'c'],
  entities: {
    pages: {
      a: {
        pages: ['d'],
        parentId: 'ij',
        level: 0,
        tabIndex: 0,
        id: 'a',
        title: 'A title',
        url: '',
        doNotShowWarningLink: true,
      },
      b: {
        pages: [],
        parentId: 'ij',
        level: 0,
        tabIndex: 0,
        id: 'd',
        title: 'B title',
        url: '',
        doNotShowWarningLink: true,
      },
      c: {
        pages: [],
        parentId: 'ij',
        level: 0,
        tabIndex: 0,
        id: 'c',
        title: 'C title',
        url: '',
        doNotShowWarningLink: true,
      },
      d: {
        pages: ['d'],
        parentId: 'a',
        level: 1,
        tabIndex: 0,
        id: 'd',
        title: 'Searched title',
        url: '',
        doNotShowWarningLink: true,
      },
    },
  },
}

const searchResult: ApiResponse = {
  entities: {
    pages: { d: pagesMock.entities.pages['d'] },
  },
  topLevelIds: ['a'],
}

describe('ApiService', () => {
  it('should fetch and return all pages', async () => {
    window.fetch = vi.fn().mockImplementation(() => ({
      json: () => Promise.resolve(pagesMock),
    }))
    const result = await ApiService.getAllPages()

    assert.deepEqual(result, pagesMock)
  })

  it('should fetch and return a page by id', async () => {
    window.fetch = vi.fn().mockImplementation(() => ({
      json: () => Promise.resolve(pagesMock.entities.pages['a']),
    }))

    const result = await ApiService.getPageById('page123')

    assert.deepEqual(result, pagesMock.entities.pages['a'])
  })

  it('should fetch and return search results', async () => {
    window.fetch = vi.fn().mockImplementation(() => ({
      json: () => Promise.resolve(searchResult),
    }))
    const result = await ApiService.searchPages('searchKeyword')

    assert.deepEqual(result, searchResult)
  })
})
