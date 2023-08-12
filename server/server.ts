import cors from 'cors'
import express from 'express'
import https from 'https'

import { ApiResponse } from './types'

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

    app.get('/', (req, res) => {
      const {
        query: { search },
      } = req
      if (search && typeof search === 'string') {
        const dataWithMatchedTitles: ApiResponse = Object.entries(
          data.entities.pages
        ).reduce(
          (acc, [pageId, page]) => {
            if (page.title.toLowerCase().includes(search.toLowerCase())) {
              acc.entities.pages[pageId] = page
              if (page.level === 0) {
                acc.topLevelIds.push(pageId)
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

        return res.json(dataWithMatchedTitles)
      }
      return res.json(data)
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
