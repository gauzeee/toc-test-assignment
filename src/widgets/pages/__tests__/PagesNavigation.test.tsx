import { act, render, RenderResult, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockApiService } from '@/__fixtures__/helpers'
import { apiService } from '@/shared'

import { PagesNavigation } from '../PagesNavigation'

mockApiService()
describe('PagesNavigation component', () => {
  let container: RenderResult

  afterEach(() => {
    container = undefined as unknown as RenderResult
  })

  it('renders table of contents element with data', async () => {
    await act(async () => {
      container = await render(<PagesNavigation />)
    })

    const tocElement = container.getByTestId('table-of-contents')
    expect(tocElement).toBeInTheDocument()
    const pageItem = container.getByTestId('page1-list-item')
    expect(pageItem).toBeInTheDocument()
  })

  it('renders search filter', async () => {
    await act(async () => {
      container = await render(<PagesNavigation />)
    })
    const searchInput = container.getByTestId('search-input')
    expect(searchInput).toBeInTheDocument()
  })

  it('fetches data from apiService.getAllPages on initial load', async () => {
    apiService.getAllPages = vi.fn()
    await act(async () => {
      container = await render(<PagesNavigation />)
    })

    await waitFor(() => {
      expect(apiService.getAllPages).toHaveBeenCalled()
      const tocElement = container.getByTestId('table-of-contents')
      expect(tocElement).toBeInTheDocument()
    })
  })

  it('fetches data from apiService.searchPages when search string is present', async () => {
    window.location = {
      hash: '',
      href: '/',
      search: '?q=searchTerm',
      pathname: 'localhost',
      protocol: 'http',
    } as Location

    apiService.searchPages = vi.fn()

    await act(async () => {
      container = await render(<PagesNavigation />)
    })

    await waitFor(() => {
      expect(apiService.searchPages).toHaveBeenCalledWith('searchTerm')
      const tocElement = container.getByTestId('table-of-contents')
      expect(tocElement).toBeInTheDocument()
    })
  })

  it('displays loading state while fetching data', async () => {
    apiService.searchPages = vi.fn(() => new Promise(() => {})) // Never resolves

    await act(async () => {
      container = await render(<PagesNavigation />)
    })

    const loader = container.getAllByTestId('list-item-loader')

    expect(loader[0]).toBeInTheDocument()
  })

  it('displays error message when data fetching fails', async () => {
    apiService.getAllPages = vi
      .fn()
      .mockRejectedValueOnce(new Error('Fetch failed'))
    await act(async () => {
      container = await render(<PagesNavigation />)
    })

    await waitFor(() => {
      expect(container.getByText('No Pages found')).toBeInTheDocument()
    })
  })
})
