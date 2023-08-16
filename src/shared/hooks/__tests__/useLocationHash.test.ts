import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useLocationHash } from '@/shared'

describe('useLocationHash', () => {
  it('initial hash value is set correctly', () => {
    const { result } = renderHook(() => useLocationHash())

    expect(result.current.hash).toBe(window.location.hash)
  })

  it('hash change is detected and updates the hash', () => {
    const { result } = renderHook(() => useLocationHash())

    act(() => {
      const newHash = 'newHash'
      window.location.hash = newHash
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    })

    expect(result.current.hash).toBe('newHash')
  })

  it('updateHash updates the window.location.hash', () => {
    const { result } = renderHook(() => useLocationHash())

    act(() => {
      result.current.updateHash('updatedHash')
    })

    expect(window.location.hash).toBe('#updatedHash')
  })

  it('updateHash does not update hash if the same value is provided', () => {
    const { result } = renderHook(() => useLocationHash())

    const initialHash = result.current.hash

    act(() => {
      result.current.updateHash(initialHash)
    })

    expect(window.location.hash).toBe(`#${initialHash}`)
  })

  it('cleanup removes event listener', () => {
    const { unmount } = renderHook(() => useLocationHash())
    const removeListener = vi.spyOn(window, 'removeEventListener')

    unmount()

    expect(removeListener).toBeCalled()
  })
})
