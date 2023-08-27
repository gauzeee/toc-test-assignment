import { useCallback, useEffect, useState } from 'react'

const SEARCH_UPDATED_EVENT = 'searchupdated'

const setSearchParams = (newParams: Record<string, string | undefined>) => {
  const searchParams = new URLSearchParams(window.location.search)
  Object.keys(newParams).forEach((paramKey) => {
    const paramVal = newParams[paramKey]
    if (paramVal) {
      searchParams.set(paramKey, paramVal)
    } else {
      searchParams.delete(paramKey)
    }
  })
  const searchParamsString = searchParams.toString()
  const newUrl = `${window.location.origin}${window.location.pathname}${
    searchParamsString.length ? `?${searchParamsString}` : ''
  }${window.location.hash}`
  history.pushState({ path: newUrl }, '', newUrl)
  window.dispatchEvent(new Event(SEARCH_UPDATED_EVENT))
}
export const useSearchParams = () => {
  const [searchParams, setParams] = useState(
    () => new URLSearchParams(window.location.search)
  )

  const handleSearchChange = useCallback(() => {
    setParams(new URLSearchParams(window.location.search))
  }, [])

  useEffect(() => {
    window.addEventListener(SEARCH_UPDATED_EVENT, handleSearchChange)

    return () => {
      window.removeEventListener(SEARCH_UPDATED_EVENT, handleSearchChange)
    }
  }, [handleSearchChange])

  return {
    searchParams,
    setSearchParams,
  }
}
