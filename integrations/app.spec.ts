import { expect, test } from '@playwright/test'

import { mockApiService } from './__fixtures__/mockApiService'

test.beforeEach(async ({ page }) => {
  await mockApiService({ page })
})

test.describe('Table of Contents demo application', () => {
  test('can start', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('Table of Contents')
  })
})
