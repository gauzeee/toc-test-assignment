import { ApiResponse, Page } from '@/server/types'

const baseUrl = import.meta.env.VITE_API_URL
class ApiService {
  private async request<T>(url: string) {
    try {
      const response = await fetch(`${baseUrl}${url}`)
      return (await response.json()) as T
    } catch (e) {
      console.error(e)
    }
  }
  async getAllPages() {
    return await this.request<ApiResponse>('/pages')
  }

  async getPageById(pageId: string) {
    return this.request<Page>(`/pages/${pageId}`)
  }

  async searchPages(searchString?: string) {
    return this.request<ApiResponse>(`?search=${searchString}`)
  }
}

export default new ApiService()
