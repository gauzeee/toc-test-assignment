import { Page } from '@playwright/test'

import emptyResponse from './emptyResponse'
import { delay } from './helpers'
import page1SearchResponse from './page1SearchResponse'
import pagesResponseMock from './pages'

const baseUrl = process.env.VITE_API_URL
export const mockApiService = async ({
  page,
  waitBeforeResponse,
  returnEmpty,
}: {
  page: Page
  returnEmpty?: boolean
  waitBeforeResponse?: number
}) => {
  await page.route(`${baseUrl}/pages`, async (route) => {
    if (waitBeforeResponse) await delay(waitBeforeResponse)
    await route.fulfill({
      json: returnEmpty ? emptyResponse : pagesResponseMock,
    })
  })
  await page.route(`${baseUrl}/pages?q=page%201`, async (route) => {
    if (waitBeforeResponse) await delay(waitBeforeResponse)
    await route.fulfill({ json: page1SearchResponse })
  })

  await page.route(`${baseUrl}/pages?q=unknown`, async (route) => {
    if (waitBeforeResponse) await delay(waitBeforeResponse)
    await route.fulfill({ json: emptyResponse })
  })
}
