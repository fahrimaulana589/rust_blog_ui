import type { StackDto } from '../types/dto/stack.dto'

export const useStacks = () => {
  const token = useCookie<string | null>('auth_token')
  const loading = useState<boolean>('stacks_loading', () => false)

  interface StacksResponse {
    message: string;
    data: {
      items: StackDto[];
      // meta might be present if paginated, but for dropdown we might just need items or fetch all
    }
  }

  const getStacks = async () => {
    loading.value = true
    try {
      // Assuming we can fetch all or paginate. For dropdown we usuall want all.
      // If backend paginates default, we might get first page.
      // Let's assume per_page=100 for now or handle pagination/search later.
      const res = await $fetch<StacksResponse>('/api/app/stacks', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        query: { per_page: 100 }
      })
      const data = (Array.isArray(res) ? res : (Array.isArray(res?.data) ? res.data : res?.data?.items)) || []
      return data
    } catch (err) {
      console.error('Fetch stacks failed:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    getStacks
  }
}
