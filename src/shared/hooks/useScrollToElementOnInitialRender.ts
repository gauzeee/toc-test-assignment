import { useEffect } from 'react'

let initialRender = true
export const useScrollToElementOnInitialRender = (
  isActive: boolean,
  id: string
) => {
  useEffect(() => {
    if (isActive && initialRender) {
      const element = document.getElementById(id)
      element?.scrollIntoView({ block: 'center' })
      initialRender = false
    }
  }, [id, isActive])
  return null
}
