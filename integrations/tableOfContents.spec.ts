import { expect, test } from '@playwright/test'

import { mockApiService } from './__fixtures__/mockApiService'
test.describe('Table of Contents component', () => {
  test('show skeletons until pages loaded', async ({ page }) => {
    await mockApiService({ page, waitBeforeResponse: 5000 })
    await page.goto('/')
    const skeletonLocator = await page.getByTestId('list-item-loader')
    await expect(skeletonLocator.first()).toBeVisible()
    await expect(skeletonLocator).toHaveCount(20)
  })

  test('show empty state if no pages loaded', async ({ page }) => {
    await mockApiService({ page, returnEmpty: true })
    await page.goto('/')
    const emptyStateLocator = await page.getByTestId('empty-list')
    await expect(emptyStateLocator).toBeVisible()
    await expect(emptyStateLocator).toHaveText(
      'No Pages for Table of Contents provided'
    )
  })

  test.describe('interactions and states', () => {
    test.beforeEach(async ({ page }) => {
      await mockApiService({ page })
    })

    test('has selected state for page that id is into location hash', async ({
      page,
    }) => {
      await page.goto('/#page1')
      const page1Locator = await page.getByTestId('page1-list-item')
      await expect(page1Locator).toHaveText('Page 1 Title')
      await expect(page1Locator).toHaveCSS(
        'background-color',
        'rgb(107, 87, 255)'
      )
      await expect(page1Locator).toHaveCSS('color', 'rgb(255, 255, 255)')
    })

    test('has expanded level 0 and level 1 lists on initial render if level 2 page hash selected', async ({
      page,
    }) => {
      await page.goto('/#page1-1-1')
      const nestedLevel0 = await page.getByTestId('page1-nested-list')
      const nestedLevel1 = await page.getByTestId('page1-1-nested-list')

      await expect(nestedLevel0).toBeVisible()
      await expect(nestedLevel1).toBeVisible()
    })

    test('nested list can be expanded and collapsed by click and enter key press', async ({
      page,
    }) => {
      await page.goto('/')
      const page5Locator = await page.getByTestId('page5-list-item')
      const page5NestedListLocator = await page.getByTestId('page5-nested-list')

      await expect(page5NestedListLocator).not.toBeVisible()
      await page5Locator.click()
      await expect(page5NestedListLocator).toBeVisible()

      await page5Locator.press('Enter')
      await expect(page5NestedListLocator).not.toBeVisible()
    })

    test('list item has border when focused', async ({ page }) => {
      await page.goto('/')
      const page1Locator = await page.getByTestId('page1-list-item')
      await page1Locator.focus()

      await expect(page1Locator).toHaveCSS('border-color', 'rgb(107, 87, 255)')
    })

    test('only lists on 0 level and 3 level has backlight when page on level 3 selected', async ({
      page,
    }) => {
      await page.goto('/#page1-1-2-1')
      const level0Locator = await page.getByTestId('page1-list-item')
      const level0ListLocator = await page.getByTestId('page1-nested-list')
      const level1Locator = await page.getByTestId('page1-1-list-item')
      const level2Locator = await page.getByTestId('page1-1-2-list-item')

      await expect(level0Locator).toHaveCSS(
        'background-color',
        'rgba(25, 25, 28, 0.05)'
      )
      await expect(level0ListLocator).toHaveCSS(
        'background-color',
        'rgba(25, 25, 28, 0.05)'
      )

      await expect(level2Locator).toHaveCSS(
        'background-color',
        'rgba(25, 25, 28, 0.05)'
      )

      // Level 1 list has no backlight
      await expect(level1Locator).toHaveCSS(
        'background-color',
        'rgba(0, 0, 0, 0)'
      )
    })

    test('only list item with nested pages has arrow', async ({ page }) => {
      await page.goto('/')

      const collapsableListItem = await page
        .getByTestId('page1-list-item')
        .innerHTML()
      const notCollapsableListItem = await page
        .getByTestId('page2-list-item')
        .innerHTML()

      await expect(collapsableListItem).toContain('right-icon')
      await expect(notCollapsableListItem).not.toContain('right-icon')
    })

    test('selecting list item updates location hash and page title', async ({
      page,
    }) => {
      await page.goto('/')
      await expect(page).toHaveTitle('Table of Contents')

      await page.getByTestId('page1-list-item').click()
      await expect(page).toHaveTitle('Page 1 Title | Table of Contents')
      await expect(page.url()).toContain('#page1')

      await page.getByTestId('page4-list-item').click()
      await expect(page).toHaveTitle('Page 4 Title | Table of Contents')
      await expect(page.url()).toContain('#page4')
    })
  })
})
