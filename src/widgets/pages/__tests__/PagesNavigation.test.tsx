import { act, render, RenderResult } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { mockApiService } from '@/__fixtures__/helpers'

import { PagesNavigation } from '../PagesNavigation'

mockApiService()
describe('PagesNavigation component', () => {
  let container: RenderResult
  it('renders children element with data', async () => {
    await act(async () => {
      container = await render(<PagesNavigation />)
    })

    const tocElement = container.getByTestId('table-of-contents')
    expect(tocElement).toBeInTheDocument()
    const pageItem = container.getByTestId('page1-list-item')
    expect(pageItem).toBeInTheDocument()
  })
})
