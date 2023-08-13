import { render } from '@testing-library/react'
import { describe, expect, it, Mock, vi } from 'vitest'

import { usePagesContext } from '@/entities'

import { TableOfContents } from '../TableOfContents'

vi.mock('@/entities', async () => {
  const mod = await vi.importActual('@/entities')
  return {
    ...(mod as NonNullable<unknown>),
    usePagesContext: vi.fn(),
  }
})

describe('TableOfContents', () => {
  it('renders loader when loading is true', () => {
    ;(usePagesContext as Mock).mockReturnValue({
      topLevelIds: [],
      loading: true,
    })
    const { getAllByTestId } = render(<TableOfContents />)
    expect(getAllByTestId('list-item-loader')[0]).toBeInTheDocument()
  })

  it('renders list items when loading is false', () => {
    ;(usePagesContext as Mock).mockReturnValue({
      pages: {
        page1: {
          level: 0,
        },
        page2: {
          level: 0,
        },
      },
      topLevelIds: ['page1', 'page2'],
      loading: false,
    })
    const { getByTestId } = render(<TableOfContents />)

    expect(getByTestId('page1-list-item')).toBeInTheDocument()
    expect(getByTestId('page2-list-item')).toBeInTheDocument()
  })
})
