import { ApiResponse, Page } from '@/server/types'

const baseUrl = import.meta.env.VITE_API_URL

// Improvement: use some lib with caching =)
const cachedData: Record<string, unknown> = {}
class ApiService {
  private async request<T>(url: string) {
    if (url in cachedData) return Promise.resolve(cachedData[url] as T)
    try {
      const response = await fetch(`${baseUrl}${url}`)
      const data = (await response.json()) as T
      cachedData[url] = data
      return data
    } catch (e) {
      console.error(e)
      alert(e)
    }
  }
  async getAllPages() {
    return await this.request<ApiResponse>('/pages')
  }

  async getPageById(pageId: string) {
    return this.request<Page>(`/pages/${pageId}`)
  }

  async searchPages(searchString?: string) {
    return this.request<ApiResponse>(`/pages?q=${searchString}`)
  }
}

export default new ApiService()
