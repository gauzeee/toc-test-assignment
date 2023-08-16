import cors from 'cors'
import express from 'express'
import https from 'https'

import { ApiResponse, Page } from './types'

const PORT = 4000

const app = express()
app.use(cors())

const loadData = async () => {
  return new Promise<ApiResponse>((resolve, reject) => {
    https.get(
      'https://www.jetbrains.com/help/idea/2023.1/HelpTOC.json',
      (res) => {
        let responseBody = ''
        res.on('data', (chunk) => {
          responseBody += chunk
        })

        res.on('end', () => {
          resolve(JSON.parse(responseBody))
        })

        res.on('error', (e) => {
          reject(e)
        })
      }
    )
  })
}

const startServer = async () => {
  try {
    const data = await loadData()

    app.get('/pages', (req, res) => {
      const {
        query: { q },
      } = req
      if (q && typeof q === 'string') {
        const dataWithMatchedTitles: ApiResponse = Object.entries(
          data.entities.pages
        ).reduce(
          (acc, [pageId, page]) => {
            if (page.title.toLowerCase().includes(q.toLowerCase())) {
              if (!acc.entities.pages[pageId]) {
                acc.entities.pages[pageId] = { ...page }
                if (page.level === 0) {
                  acc.topLevelIds.push(pageId)
                } else {
                  const addParent = (page: Page) => {
                    if (!acc.entities.pages[page.id]) {
                      acc.entities.pages[page.id] = { ...page }
                      if (page.level === 0) {
                        acc.topLevelIds.push(page.id)
                      } else {
                        addParent(data.entities.pages[page.parentId])
                      }
                    }
                  }

                  addParent(data.entities.pages[page.parentId])
                }
              }
            }
            return acc
          },
          {
            entities: {
              pages: {},
            },
            topLevelIds: [],
          } as ApiResponse
        )

        Object.values(dataWithMatchedTitles.entities.pages).forEach((page) => {
          if (page.pages) {
            page.pages = page.pages.filter(
              (pagesPageId) =>
                pagesPageId in dataWithMatchedTitles.entities.pages
            )
          }
        })

        return res.json(dataWithMatchedTitles)
      }
      return res.json(data)
    })

    app.get('/pages/:pageId', (req, res) => {
      const pageId = req.params.pageId
      const page = data.entities.pages?.[pageId]

      if (page) {
        res.json(page)
      } else {
        res.status(404)
        res.send(`Page with id: ${pageId} not found`)
      }
    })

    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

startServer()
