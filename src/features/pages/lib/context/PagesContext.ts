import { createContext } from 'react'

import { PagesContextValue } from './types'
export const PagesContext = createContext<PagesContextValue>({
  pages: {},
})
