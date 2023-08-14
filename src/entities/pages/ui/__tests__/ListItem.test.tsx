import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ListItem } from '../ListItem/ListItem'

describe('ListItem', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(
      <ListItem level={0} testId="list-item">
        Page 1
      </ListItem>
    )
    const listItem = getByTestId('list-item')
    expect(listItem).toBeInTheDocument()
  })

  it('calls handleClick when clicked', () => {
    const handleClick = vi.fn()
    const { getByTestId } = render(
      <ListItem level={0} testId="list-item" handleClick={handleClick}>
        Page 1
      </ListItem>
    )
    const listItem = getByTestId('list-item')
    fireEvent.click(listItem)
    expect(handleClick).toHaveBeenCalled()
  })

  it('calls handleKeyUp when key is pressed', () => {
    const handleKeyUp = vi.fn()
    const { getByTestId } = render(
      <ListItem level={0} testId="list-item" handleKeyUp={handleKeyUp}>
        Page 1
      </ListItem>
    )
    const listItem = getByTestId('list-item')
    fireEvent.keyUp(listItem, { key: 'Enter', code: 'Enter' })
    expect(handleKeyUp).toHaveBeenCalled()
  })

  it('adds active styles when isActive is true', () => {
    const { getByTestId } = render(
      <ListItem level={0} testId="list-item" isActive={true}>
        Page 1
      </ListItem>
    )
    const listItem = getByTestId('list-item')
    expect(listItem.className).to.includes('listItemActive')
  })

  it('adds expanded styles when isOpen is true', () => {
    const { getByTestId } = render(
      <ListItem level={0} testId="list-item" isOpen={true}>
        Page 1
      </ListItem>
    )
    const listItem = getByTestId('list-item')
    expect(listItem.className).to.includes('listItemExpanded')
  })

  it('adds backlight styles when showBacklight is true', () => {
    const { getByTestId } = render(
      <ListItem level={0} testId="list-item" showBacklight={true}>
        Page 1
      </ListItem>
    )
    const listItem = getByTestId('list-item')
    expect(listItem.className).to.includes('listItemBacklight')
  })

  it('renders RightIcon when hasInnerList is true', () => {
    const { getByTestId } = render(
      <ListItem level={0} testId="list-item" hasInnerList={true}>
        Page 1
      </ListItem>
    )
    const rightIcon = getByTestId('right-icon')
    expect(rightIcon).toBeInTheDocument()
  })

  it('displays children', () => {
    const { getByTestId } = render(
      <ListItem level={0} testId="list-item">
        Page 1
      </ListItem>
    )
    const listItem = getByTestId('list-item')
    expect(listItem).toHaveTextContent('Page 1')
  })
})
