import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { mockPagesContext } from '@/__fixtures__/mockPagesContext.ts'
import { setDocumentTitle } from '@/shared'

import { PagesContext } from '../../../../lib/context'
import { ExpandableListItem } from '../ExpandableListItem/ExpandableListItem'

const updateHashMock = vi.fn()

describe('ExpandableListItem', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })
  vi.spyOn(window, 'scrollTo')

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

  it('shows backlight for list item in right conditions', () => {
    vi.mock('@/shared', async () => {
      const actual = await vi.importActual('@/shared')
      return {
        ...(actual as NonNullable<unknown>),
        setDocumentTitle: vi.fn(),
        useLocationHash: () => ({
          hash: 'mockNestedPageId',
          updateHash: vi.fn(),
        }),
      }
    })

    const { getByTestId } = render(
      <PagesContext.Provider value={mockPagesContext}>
        <ExpandableListItem pageId="mockPageId" />
      </PagesContext.Provider>
    )
    const listItem = getByTestId('mockPageId-list-item')
    expect(listItem.className).to.includes('listItemBacklight')
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

  it('updates the document title and location hash on click', () => {
    Element.prototype.scrollIntoView = vi.fn()

    vi.mock('@/shared', async () => {
      const actual = await vi.importActual('@/shared')
      return {
        ...(actual as NonNullable<unknown>),
        setDocumentTitle: vi.fn(),
        useLocationHash: () => ({
          hash: 'mockNestedPageId',
          updateHash: updateHashMock,
        }),
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
    expect(updateHashMock).toBeCalledWith(mockPagesContext.mockPageId.id)
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
