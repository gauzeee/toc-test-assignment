import { ReactNode, useEffect, useState } from 'react'

import { ApiResponse, Page } from '@/server/types'
import { highlightMatches, useLocationHash, useSearchParams } from '@/shared'

import { PagesContext } from '../../lib'
import { Loader } from '../../ui/TableOfContents/parts'

export const PagesProvider = ({
  tocData,
  loading,
  children,
}: {
  loading?: boolean
  tocData?: ApiResponse
  children: ReactNode
}) => {
  const [activePagesIds, setActivePagesIds] = useState<string[]>()
  const [pages, setPages] = useState<Record<string, Page>>()
  const [topLevelIds, setTopLevelIds] = useState<string[]>()
  const [localLoading, setLocalLoading] = useState(loading)
  const { searchParams } = useSearchParams()
  const searchString = searchParams.get('q')
  const { hash } = useLocationHash()

  useEffect(() => {
    setLocalLoading(loading)
  }, [loading])

  useEffect(() => {
    if (tocData) {
      setLocalLoading(true)
      let nextPages = { ...tocData?.entities?.pages }
      let nextTopLevelIds = [...(tocData?.topLevelIds ?? [])]
      const nextActivePagesIds = new Set<string>()

      if (searchString) {
        const dataWithMatchedTitles: ApiResponse = Object.entries(
          nextPages
        ).reduce(
          (acc, [pageId, page]) => {
            const regexp = new RegExp(searchString, 'gi')
            const matches = [...page.title.matchAll(regexp)]
            if (matches.length) {
              nextActivePagesIds.add(pageId)
              if (!acc.entities.pages[pageId]) {
                acc.entities.pages[pageId] = {
                  ...page,
                  title: highlightMatches(page.title, matches),
                }
                if (page.level === 0) {
                  acc.topLevelIds.push(pageId)
                } else {
                  const addParent = (page: Page) => {
                    if (!acc.entities.pages[page.id]) {
                      acc.entities.pages[page.id] = {
                        ...page,
                      }
                      if (page.level === 0) {
                        acc.topLevelIds.push(page.id)
                      } else {
                        addParent(nextPages[page.parentId])
                      }
                    }
                  }

                  addParent(nextPages[page.parentId])
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

        nextPages = dataWithMatchedTitles.entities.pages
        nextTopLevelIds = dataWithMatchedTitles.topLevelIds
      }

      if (hash) {
        nextActivePagesIds.add(hash)
      }

      if (nextActivePagesIds.size) {
        const initialActiveIds = Array.from(nextActivePagesIds)
        initialActiveIds.forEach((pageId) => {
          let page = nextPages?.[pageId]
          while (page) {
            nextActivePagesIds.add(page.id)
            page = nextPages?.[page?.parentId]
          }
        })
      }

      setActivePagesIds(Array.from(nextActivePagesIds))
      setPages(nextPages)
      setTopLevelIds(nextTopLevelIds)
      setLocalLoading(false)
    }
  }, [searchString, tocData, hash])

  return !localLoading && !!activePagesIds && !!pages && !!topLevelIds ? (
    <PagesContext.Provider
      value={{ pages, activePagesIds, topLevelIds, loading: localLoading }}
    >
      {children}
    </PagesContext.Provider>
  ) : (
    <Loader />
  )
}
