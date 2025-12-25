import type { TagDto, CreateTagDto, UpdateTagDto } from '../types/dto/tag.dto'

export const useTags = () => {
  const token = useCookie<string | null>('auth_token')
  const loading = useState<boolean>('tags_loading', () => false)

  interface Meta {
    page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
  }

  interface TagsResponse {
    message: string;
    data: {
      items: TagDto[];
      meta?: Meta;
    }
  }

  const getTags = async (page = 1, per_page = 10) => {
    loading.value = true
    try {
      const res = await $fetch<TagsResponse>('/api/app/tags', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        query: { page, per_page }
      })
      return res
    } catch (err) {
      console.error('Fetch tags failed:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getTag = async (id: number) => {
    loading.value = true
    try {
      return await $fetch<TagDto>(`/api/app/tags/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
    } finally {
      loading.value = false
    }
  }

  const createTag = async (payload: CreateTagDto) => {
    loading.value = true
    try {
      return await $fetch('/api/app/tags', {
        method: 'POST' as any,
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        body: payload
      })
    } finally {
      loading.value = false
    }
  }

  const updateTag = async (id: number, payload: UpdateTagDto) => {
    loading.value = true
    try {
      return await $fetch(`/api/app/tags/${id}`, {
        method: 'PUT' as any,
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        body: payload
      })
    } finally {
      loading.value = false
    }
  }

  const deleteTag = async (id: number) => {
    loading.value = true
    try {
      return await $fetch(`/api/app/tags/${id}`, {
        method: 'DELETE' as any,
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    getTags,
    getTag,
    createTag,
    updateTag,
    deleteTag
  }
}
