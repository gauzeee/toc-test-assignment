import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AnimateHeight } from '../AnimateHeight/AnimateHeight'

describe('AnimateHeight component', async () => {
  it('renders children when isOpen is true with auto height', () => {
    const { getByText, getByTestId } = render(
      <AnimateHeight isOpen={true}>Child content</AnimateHeight>
    )
    const childContent = getByText('Child content')
    const animatedDiv = getByTestId('animated-div')
    expect(childContent).toBeInTheDocument()
    expect(animatedDiv).toHaveStyle({ height: 'auto' })
  })

  it('does not render children when isOpen is false', () => {
    const { container } = render(
      <AnimateHeight isOpen={false}>Child content</AnimateHeight>
    )
    expect(container).not.toHaveTextContent('Child content')
  })
})
