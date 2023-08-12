import { useEffect } from 'react'

let initialRender = true
export const useScrollToElementOnInitialRender = <T extends HTMLElement | null>(
  isActive: boolean,
  element: T
) => {
  useEffect(() => {
    if (isActive && initialRender && element) {
      element.scrollIntoView({ block: 'center' })
      initialRender = false
    }
  }, [element, isActive])
  return null
}
