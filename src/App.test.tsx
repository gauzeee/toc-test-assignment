import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import App from './App'

describe('App', () => {
  it('renders with layout elements', () => {
    const app = render(<App />)

    expect(app.getByTestId('app-header')).toBeInTheDocument()
    expect(app.getByTestId('app-footer')).toBeInTheDocument()
    expect(app.getByTestId('app-main')).toBeInTheDocument()
    expect(app.getByTestId('app-aside')).toBeInTheDocument()
  })
})
