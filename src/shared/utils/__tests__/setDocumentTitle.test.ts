import { assert, describe, it, vi } from 'vitest'

import { setDocumentTitle } from '../setDocumentTitle'

describe('setDocumentTitle', () => {
  const originalDocumentQuerySelector = document.querySelector
  afterEach(() => {
    document.querySelector = originalDocumentQuerySelector
  })

  it('should set the document title with base title', () => {
    const pageTitle = {
      text: '',
    }

    document.querySelector = vi.fn().mockImplementation((selector) => {
      if (selector === 'title') {
        return pageTitle
      }
    })

    setDocumentTitle('Page Title')

    assert.equal(pageTitle.text, 'Page Title | Table of Contents')
  })

  it('should set the document title to base title if newTitle is undefined', () => {
    const pageTitle = {
      text: 'Table of Contents',
    }

    document.querySelector = vi.fn().mockImplementation((selector) => {
      if (selector === 'title') {
        return pageTitle
      }
    })

    setDocumentTitle()

    assert.equal(pageTitle.text, 'Table of Contents')
  })
})
