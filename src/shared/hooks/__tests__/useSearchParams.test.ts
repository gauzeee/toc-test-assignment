import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useSearchParams } from '../useSearchParams'

describe('useSearchParams', () => {
  it('should initialize with correct default search params', () => {
    const { result } = renderHook(() => useSearchParams())
    expect(result.current.searchParams.get('paramName')).toBeNull() // Test default parameter
  })

  it('should update searchParams when setSearchParams is called', () => {
    const { result } = renderHook(() => useSearchParams())
    const newSearchParams = new URLSearchParams('?paramName=newValue')
    act(() => {
      result.current.setSearchParams({ paramName: 'newValue' })
    })
    expect(result.current.searchParams.toString()).toBe(
      newSearchParams.toString()
    )
  })

  it('should remove param when setting it to undefined', () => {
    const { result } = renderHook(() => useSearchParams())
    act(() => {
      result.current.setSearchParams({ paramName: 'value' })
      result.current.setSearchParams({ paramName: undefined })
    })
    expect(result.current.searchParams.get('paramName')).toBeNull()
  })
})
