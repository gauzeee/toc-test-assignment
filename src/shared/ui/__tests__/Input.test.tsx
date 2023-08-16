import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Input } from '../Input/Input'

describe('Input Component', () => {
  it('renders the input with label', () => {
    const { getByLabelText } = render(<Input label="Username" id="input" />)
    const inputWithLabel = getByLabelText('Username')
    expect(inputWithLabel).toBeInTheDocument()
  })

  it('renders the input with provided classes', () => {
    const { getByTestId } = render(
      <Input
        label="Username"
        classes={{
          input: 'custom-input',
          container: 'container-class',
          label: 'label-class',
        }}
        testId="input"
      />
    )
    const inputElement = getByTestId('input')
    const inputContainer = getByTestId('input-container')
    const inputLabel = getByTestId('input-label')
    expect(inputElement).toHaveClass('custom-input')
    expect(inputContainer).toHaveClass('container-class')
    expect(inputLabel).toHaveClass('label-class')
  })

  it('renders an icon before the input', () => {
    const icon = <span data-testid="custom-icon" />
    const { getByTestId } = render(<Input label="Username" iconBefore={icon} />)
    expect(getByTestId('custom-icon')).toBeInTheDocument()
  })

  it('calls the onChange callback', () => {
    const onChangeMock = vi.fn()
    const { getByTestId } = render(
      <Input onChange={onChangeMock} testId="input" />
    )
    const inputElement = getByTestId('input')
    fireEvent.change(inputElement, { target: { value: 'newvalue' } })
    expect(onChangeMock).toBeCalledTimes(1)
    expect(inputElement).toHaveValue('newvalue')
  })
})
