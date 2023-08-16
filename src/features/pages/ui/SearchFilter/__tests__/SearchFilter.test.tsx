import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SearchFilter } from '../SearchFilter'

const setSearchParamsMock = vi.fn()
vi.mock('@/shared', async () => {
  const actual = await vi.importActual('@/shared')
  return {
    ...(actual as NonNullable<unknown>),
    useSearchParams: () => ({
      searchParams: new URLSearchParams(),
      setSearchParams: vi.fn(),
    }),
    SearchIcon: vi.fn().mockReturnValue(null),
  }
})

describe('SearchFilter Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<SearchFilter />)
    const searchInput = getByTestId('search-input')
    expect(searchInput).toBeInTheDocument()
  })

  it('has label', () => {
    const { getByLabelText } = render(<SearchFilter />)
    const searchInputWithLabel = getByLabelText('Search for pages...')
    expect(searchInputWithLabel).toBeInTheDocument()
  })

  it('handles input change', () => {
    const { getByTestId } = render(<SearchFilter />)
    const searchInput = getByTestId('search-input')

    fireEvent.change(searchInput, { target: { value: 'test' } })
    expect(searchInput).toHaveValue('test')

    fireEvent.change(searchInput, { target: { value: 'new value' } })
    expect(searchInput).toHaveValue('new value')
  })

  it('handles form submission', () => {
    vi.mock('@/shared', async () => {
      const actual = await vi.importActual('@/shared')
      return {
        ...(actual as NonNullable<unknown>),
        useSearchParams: () => ({
          searchParams: new URLSearchParams(),
          setSearchParams: setSearchParamsMock,
        }),
        SearchIcon: vi.fn().mockReturnValue(null),
      }
    })

    const { getByTestId } = render(<SearchFilter />)
    const searchInput = getByTestId('search-input')
    fireEvent.change(searchInput, { target: { value: 'test query' } })

    const form = getByTestId('search-form')
    fireEvent.submit(form)

    expect(setSearchParamsMock).toHaveBeenCalledWith({
      q: 'test query',
    })
  })
})
