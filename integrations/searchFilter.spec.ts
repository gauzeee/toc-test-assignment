import { expect, test } from '@playwright/test'

import { mockApiService } from './__fixtures__/mockApiService'

test.describe('Search filter', () => {
  test.beforeEach(async ({ page }) => {
    await mockApiService({ page })
  })
  test('can be rendered', async ({ page }) => {
    await page.goto('/')
    const searchFilterLocator = await page.getByTestId('search-input')
    await expect(searchFilterLocator).toBeVisible()
  })

  test('handle search query on render', async ({ page }) => {
    await page.goto('/?q=page+1')
    const searchFilterLocator = await page.getByTestId('search-input')
    await expect(searchFilterLocator).toHaveAttribute('value', 'page 1')
  })

  test('can search for pages', async ({ page }) => {
    await page.goto('/')
    const searchFilterLocator = await page.getByTestId('search-input')
    const searchFormLocator = await page.getByTestId('search-form')
    const tableOfContentsLocator = await page.getByTestId('table-of-contents')
    const pages = await tableOfContentsLocator.getByRole('button')
    await expect(pages).toHaveCount(5)
    await searchFilterLocator.type('page 1')
    await searchFormLocator.press('Enter')
    await expect(pages).toHaveCount(1)
  })

  test('update location search', async ({ page }) => {
    await page.goto('/')
    const search = 'unknown'
    const searchFilterLocator = await page.getByTestId('search-input')
    await expect(page.url()).not.toContain(search)
    await searchFilterLocator.type(search)
    await searchFilterLocator.press('Enter')
    await expect(page.url()).toContain(search)
  })

  test('update pages data to empty state if nothing found', async ({
    page,
  }) => {
    await page.goto('/')
    const searchFilterLocator = await page.getByTestId('search-input')
    await searchFilterLocator.type('unknown')
    await searchFilterLocator.press('Enter')
    await expect(page.getByText('No Pages found')).toBeVisible()
  })

  test('has right styles on focus', async ({ page }) => {
    await page.goto('/')
    const searchFilterLocator = await page.getByTestId('search-input')
    await searchFilterLocator.focus()
    await expect(searchFilterLocator).toHaveCSS(
      'border-color',
      'rgb(107, 87, 255)'
    )
  })
})
