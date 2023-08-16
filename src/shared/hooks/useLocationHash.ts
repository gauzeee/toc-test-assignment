import { useCallback, useEffect, useState } from 'react'

export const useLocationHash = () => {
  const [hash, setHash] = useState(() => window.location.hash.slice(1))

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash.slice(1))
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler)
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [hashChangeHandler])

  const updateHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) window.location.hash = newHash
    },
    [hash]
  )

  return { hash, updateHash }
}
