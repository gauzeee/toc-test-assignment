import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Page } from '@/server/types'

import { TableOfContents } from '../TableOfContents'

describe('TableOfContents', () => {
  it('renders loader when loading is true', () => {
    const { getAllByTestId } = render(
      <TableOfContents
        loading={true}
        pages={undefined}
        topLevelIds={undefined}
      />
    )
    expect(getAllByTestId('list-item-loader')[0]).toBeInTheDocument()
  })

  it('renders empty state when loading finished but no pages loaded', () => {
    const { getByTestId } = render(
      <TableOfContents
        loading={false}
        topLevelIds={undefined}
        pages={undefined}
      />
    )
    const emptyList = getByTestId('empty-list')
    expect(emptyList).toBeInTheDocument()
  })

  it('renders list items when loading is false', () => {
    const { getByTestId } = render(
      <TableOfContents
        loading={false}
        topLevelIds={['page1', 'page2']}
        pages={{
          page1: {
            level: 0,
          } as Page,
          page2: {
            level: 0,
          } as Page,
        }}
      />
    )

    expect(getByTestId('page1-list-item')).toBeInTheDocument()
    expect(getByTestId('page2-list-item')).toBeInTheDocument()
  })
})
