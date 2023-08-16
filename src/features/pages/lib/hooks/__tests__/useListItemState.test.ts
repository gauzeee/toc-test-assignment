import { renderHook } from '@testing-library/react'
import { describe, expect, it, Mock, vi } from 'vitest'

import { mockPagesContext } from '@/__fixtures__/mockPagesContext.ts'

import { usePagesContext } from '../../context'
import { useListItemState } from '../useListItemState'

vi.mock('../../context', () => ({
  usePagesContext: vi.fn(),
}))

describe('useListItemState', () => {
  it('returns default state when pageId and hash do not match any pages', () => {
    ;(usePagesContext as Mock).mockReturnValue({}) // Empty pages context
    const { result } = renderHook(() => useListItemState('nonexistent', ''))

    expect(result.current).toEqual({
      page: undefined,
      hasInnerList: false,
      isActive: false,
      isActiveParent: false,
      showBacklight: false,
    })
  })

  it('calculates correct state values based on pageId and hash', () => {
    ;(usePagesContext as Mock).mockReturnValue(mockPagesContext)

    const { result: rootPageResult } = renderHook(() =>
      useListItemState('mockPageId', 'mockNestedPageId')
    )

    expect(rootPageResult.current).toEqual({
      page: mockPagesContext['mockPageId'],
      hasInnerList: true,
      isActive: false,
      isActiveParent: true,
      showBacklight: true,
    })

    const { result: nestedPageResult } = renderHook(() =>
      useListItemState('mockNestedPageId', 'mockNestedPageId')
    )

    expect(nestedPageResult.current).toEqual({
      page: mockPagesContext['mockNestedPageId'],
      hasInnerList: false,
      isActive: true,
      isActiveParent: false,
      showBacklight: false,
    })
  })
})
