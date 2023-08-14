import { render } from '@testing-library/react'
import { describe, expect } from 'vitest'

import { MainLayout } from '../MainLayout/MainLayout'

describe('MainLayout', () => {
  it('should renders with layout containers', () => {
    const { getByTestId } = render(
      <MainLayout
        headerSlot={<header />}
        mainSlot={<main />}
        footerSlot={<footer />}
        asideSlot={<aside />}
      />
    )

    expect(getByTestId('app-header')).toBeInTheDocument()
    expect(getByTestId('app-footer')).toBeInTheDocument()
    expect(getByTestId('app-main')).toBeInTheDocument()
    expect(getByTestId('app-aside')).toBeInTheDocument()
  })
})
