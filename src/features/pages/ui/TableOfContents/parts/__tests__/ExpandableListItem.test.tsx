import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { PagesContext } from '@/features/pages/lib/context/PagesContext.tsx'
import { EnhancedPages } from '@/features/pages/lib/context/types.ts'
import { setDocumentTitle } from '@/shared'

import { ExpandableListItem } from '../ExpandableListItem/ExpandableListItem.tsx'

describe('ExpandableListItem', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  vi.spyOn(window, 'scrollTo')

  const mockPagesContext: EnhancedPages = {
    mockPageId: {
      pages: ['mockNestedPageId'],
      parentId: 'ij',
      level: 0,
      title: 'Mock Page Title',
      url: '',
      allNestedPagesIds: ['mockNestedPageId'],
      id: 'mockPageId',
      tabIndex: 0,
      doNotShowWarningLink: true,
    },
    mockNestedPageId: {
      pages: [],
      parentId: 'mockPageId',
      level: 1,
      title: 'Mock Nested Page Title',
      url: '',
      allNestedPagesIds: [],
      id: 'mockNestedPageId',
      tabIndex: 0,
      doNotShowWarningLink: true,
    },
  }

  it('renders without crashing', () => {
    render(
      <PagesContext.Provider value={mockPagesContext}>
        <ExpandableListItem pageId="mockPageId" />
      </PagesContext.Provider>
    )
  })

  it('displays the page title', () => {
    const { getByText } = render(
      <PagesContext.Provider value={mockPagesContext}>
        <ExpandableListItem pageId="mockPageId" />
      </PagesContext.Provider>
    )
    const pageTitle = getByText(mockPagesContext.mockPageId.title)
    expect(pageTitle).toBeInTheDocument()
  })

  it('handles click event and toggles isOpen state', () => {
    const { getByText } = render(
      <PagesContext.Provider value={mockPagesContext}>
        <ExpandableListItem pageId="mockPageId" />
      </PagesContext.Provider>
    )
    const listItem = getByText(mockPagesContext.mockPageId.title)
    fireEvent.click(listItem)
    const innerListItem = getByText(mockPagesContext.mockNestedPageId.title)
    expect(innerListItem).toBeInTheDocument()
  })

  it('updates the document title on click', () => {
    Element.prototype.scrollIntoView = vi.fn()

    vi.mock('@/shared', async () => {
      const actual = await vi.importActual('@/shared')
      return {
        ...(actual as NonNullable<unknown>),
        setDocumentTitle: vi.fn(),
      }
    })

    const { getByText } = render(
      <PagesContext.Provider value={mockPagesContext}>
        <ExpandableListItem pageId="mockPageId" />
      </PagesContext.Provider>
    )
    const listItem = getByText(mockPagesContext.mockPageId.title)
    fireEvent.click(listItem)
    expect(setDocumentTitle).toBeCalledWith(mockPagesContext.mockPageId.title)
  })

  it('handles keyUp event and triggers onSelectElement on Enter', () => {
    const { getByText } = render(
      <PagesContext.Provider value={mockPagesContext}>
        <ExpandableListItem pageId="mockPageId" />
      </PagesContext.Provider>
    )
    const listItem = getByText(mockPagesContext.mockPageId.title)
    fireEvent.keyUp(listItem, { key: 'Enter' })
    const innerListItem = getByText(mockPagesContext.mockNestedPageId.title)
    expect(innerListItem).toBeInTheDocument()
  })

  it('display inner list when hasInnerList is true', () => {
    const { getByTestId } = render(
      <PagesContext.Provider value={mockPagesContext}>
        <ExpandableListItem pageId="mockPageId" />
      </PagesContext.Provider>
    )
    const listItem = getByTestId('mockPageId-list-item')
    fireEvent.click(listItem)
    const subListItem = getByTestId('mockPageId-nested-list')
    expect(subListItem).toBeInTheDocument()
  })
})
