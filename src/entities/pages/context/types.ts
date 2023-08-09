import { ApiResponse } from '@/server/types.ts'

export interface PagesContextProps {
  data?: ApiResponse
  loading: boolean
}
