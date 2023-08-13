import { renderHook } from '@testing-library/react'
import { describe, expect, vi } from 'vitest'

import { useScrollToElementOnInitialRender } from '../useScrollToElementOnInitialRender'

describe('useScrollToElementOnInitialRender', () => {
  let originalScrollIntoView: (
    arg?: boolean | ScrollIntoViewOptions | undefined
  ) => void

  beforeAll(() => {
    originalScrollIntoView = Element.prototype.scrollIntoView
    Element.prototype.scrollIntoView = vi.fn()
  })

  afterAll(() => {
    Element.prototype.scrollIntoView = originalScrollIntoView
  })

  it('should scroll into view on initial render if isActive is true', () => {
    const dummyElement = document.createElement('div')
    const { rerender } = renderHook(
      (isActive) => useScrollToElementOnInitialRender(isActive, dummyElement),
      { initialProps: true }
    )

    expect(dummyElement.scrollIntoView).toHaveBeenCalledTimes(1)

    // Re-render with isActive set to false
    rerender(false)
    expect(dummyElement.scrollIntoView).toHaveBeenCalledTimes(1) // Should not be called again
  })

  it('should not scroll into view if isActive is false', () => {
    const dummyElement = document.createElement('div')
    renderHook(() => useScrollToElementOnInitialRender(false, dummyElement))

    expect(dummyElement.scrollIntoView).not.toHaveBeenCalled()
  })

  it('should not scroll into view if element is null', () => {
    renderHook(() => useScrollToElementOnInitialRender(true, null))

    expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled()
  })
})
