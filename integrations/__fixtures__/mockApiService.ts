import { Page } from '@playwright/test'

import { delay } from './helpers'
import pagesResponseMock from './pages'

export const mockApiService = async ({
  page,
  waitBeforeResponse,
  returnEmpty,
}: {
  page: Page
  returnEmpty?: boolean
  waitBeforeResponse?: number
}) => {
  await page.route('http://localhost:4000/pages', async (route) => {
    if (waitBeforeResponse) await delay(waitBeforeResponse)
    await route.fulfill({ json: returnEmpty ? {} : pagesResponseMock })
  })
}
