import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { mapPagesToEnhancedPages, PagesContext } from '@/features/pages/lib'

import { NestedList } from '../NestedList/NestedList'

const mock = {
  entities: {
    pages: {
      page1: {
        id: 'page1',
        title: 'Page 1',
        parentId: 'ij',
        level: 0,
        url: '',
        tabIndex: 0,
        doNotShowWarningLink: true,
        pages: ['page2', 'page3'],
      },
      page2: {
        id: 'page2',
        title: 'Page 2',
        parentId: 'page1',
        level: 1,
        url: '',
        tabIndex: 0,
        doNotShowWarningLink: true,
      },
      page3: {
        id: 'page3',
        title: 'Page 3',
        parentId: 'page1',
        level: 1,
        url: '',
        tabIndex: 0,
        doNotShowWarningLink: true,
      },
    },
  },
  topLevelIds: ['page1'],
}
describe('NestedList', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <NestedList isActive={false} testId="nested-list" />
    )
    const nestedList = getByTestId('nested-list')
    expect(nestedList).toBeInTheDocument()
  })

  it('adds active styles when isActive is true', () => {
    const { getByTestId } = render(
      <NestedList isActive={true} testId="nested-list" />
    )
    const nestedList = getByTestId('nested-list')
    expect(nestedList.className).to.includes('nestedListActive')
  })

  it('renders ExpandableListItem for each pageId', () => {
    const pagesIds = ['page2', 'page3']
    const { getByTestId } = render(
      <PagesContext.Provider
        value={mapPagesToEnhancedPages(mock.entities.pages)}
      >
        <NestedList isActive={false} testId="nested-list" pagesIds={pagesIds} />
      </PagesContext.Provider>
    )

    const nestedList = getByTestId('nested-list')
    expect(nestedList).toBeInTheDocument()
    const expandableItem1 = getByTestId('page2-list-item')
    const expandableItem2 = getByTestId('page3-list-item')
    expect(expandableItem1).toBeInTheDocument()
    expect(expandableItem2).toBeInTheDocument()
  })
})
