import type { BlogDto, CreateBlogDto, UpdateBlogDto } from '../types/dto/blog.dto'

export const useBlogs = () => {
  const token = useCookie<string | null>('auth_token')
  const loading = useState<boolean>('blogs_loading', () => false)

  interface Meta {
    page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
  }

  interface BlogsResponse {
    message: string;
    data: {
      items: BlogDto[];
      meta?: Meta;
    }
  }

  const getBlogs = async (page = 1, per_page = 10) => {
    loading.value = true
    try {
      const res = await $fetch<BlogsResponse>('/api/app/blogs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        query: { page, per_page }
      })
      return res
    } catch (err) {
      console.error('Fetch blogs failed:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getBlog = async (id: number) => {
    loading.value = true
    try {
      return await $fetch<BlogDto>(`/api/app/blogs/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
    } finally {
      loading.value = false
    }
  }

  const createBlog = async (payload: CreateBlogDto) => {
    loading.value = true
    try {
      return await $fetch('/api/app/blogs', {
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

  const updateBlog = async (id: number, payload: UpdateBlogDto) => {
    loading.value = true
    try {
      return await $fetch(`/api/app/blogs/${id}`, {
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

  const deleteBlog = async (id: number) => {
    loading.value = true
    try {
      return await $fetch(`/api/app/blogs/${id}`, {
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
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
  }
}
