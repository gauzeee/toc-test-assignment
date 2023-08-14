import { describe, expect, it, vi } from 'vitest'

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

    expect(result).toEqual(pagesMock)
  })

  it('should fetch and return a page by id', async () => {
    window.fetch = vi.fn().mockImplementation(() => ({
      json: () => Promise.resolve(pagesMock.entities.pages['a']),
    }))

    const result = await ApiService.getPageById('page123')

    expect(result).toEqual(pagesMock.entities.pages['a'])
  })

  it('should fetch and return search results', async () => {
    window.fetch = vi.fn().mockImplementation(() => ({
      json: () => Promise.resolve(searchResult),
    }))
    const result = await ApiService.searchPages('searchKeyword')

    expect(result).toEqual(searchResult)
  })

  it('should catch an error', async () => {
    window.fetch = vi
      .fn()
      .mockImplementation(() => Promise.reject(new Error('API Error')))
    window.alert = vi.fn()
    console.error = vi.fn()

    await ApiService.getAllPages()
    expect(window.alert).toBeCalledWith(new Error('API Error'))
    expect(console.error).toBeCalledWith(new Error('API Error'))
  })
})
