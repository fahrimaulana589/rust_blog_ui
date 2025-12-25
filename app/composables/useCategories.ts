import type { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from '../types/dto/category.dto'

export const useCategories = () => {
  const token = useCookie<string | null>('auth_token')
  const loading = useState<boolean>('categories_loading', () => false)

  interface Meta {
    page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
  }

  interface CategoriesResponse {
    message: string;
    data: {
      items: CategoryDto[];
      meta?: Meta;
    }
  }

  const getCategories = async (page = 1, per_page = 10) => {
    loading.value = true
    try {
      const res = await $fetch<CategoriesResponse>('/api/app/categories', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        query: { page, per_page }
      })
      return res
    } catch (err) {
      console.error('Fetch categories failed:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getCategory = async (id: number) => {
    loading.value = true
    try {
      return await $fetch<CategoryDto>(`/api/app/categories/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (payload: CreateCategoryDto) => {
    loading.value = true
    try {
      return await $fetch('/api/app/categories', {
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

  const updateCategory = async (id: number, payload: UpdateCategoryDto) => {
    loading.value = true
    try {
      return await $fetch(`/api/app/categories/${id}`, {
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

  const deleteCategory = async (id: number) => {
    loading.value = true
    try {
      return await $fetch(`/api/app/categories/${id}`, {
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
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
  }
}
