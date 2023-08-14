import { act, render, RenderResult } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { mockApiService } from '@/__fixtures__/helpers'

import App from './App'

mockApiService()
describe('App', () => {
  let container: RenderResult
  it('renders without crashing', async () => {
    await act(async () => {
      container = await render(<App />)
    })

    expect(container.container).toBeInTheDocument()
  })
})
