import type { PortofolioDto, CreatePortofolioDto, UpdatePortofolioDto } from '../types/dto/portofolio.dto'

export const usePortofolios = () => {
  const token = useCookie<string | null>('auth_token')
  const loading = useState<boolean>('portofolios_loading', () => false)

  interface Meta {
    page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
  }

  interface PortofoliosResponse {
    message: string;
    data: {
      items: PortofolioDto[];
      meta?: Meta;
    }
  }

  const getPortofolios = async (page = 1, per_page = 10) => {
    loading.value = true
    try {
      const res = await $fetch<PortofoliosResponse>('/api/app/portofolios', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        query: {
          page: page,
          per_page: per_page
        }
      })
      return res
    } catch (err) {
      console.error('Fetch stacks failed:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const getPortofolio = async (id: number) => {
    loading.value = true
    try {
      return await $fetch<PortofolioDto>(`/api/app/portofolios/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
    } finally {
      loading.value = false
    }
  }

  const getPortofolioBySlug = async (slug: string) => {
    loading.value = true
    try {
      const res = await $fetch<{ data: PortofolioDto }>(`/api/app/portofolios/slug/${slug}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      return res.data
    } finally {
      loading.value = false
    }
  }

  const createPortofolio = async (payload: CreatePortofolioDto) => {
    loading.value = true
    try {
      return await $fetch('/api/app/portofolios', {
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

  const updatePortofolio = async (id: number, payload: UpdatePortofolioDto) => {
    loading.value = true
    try {
      return await $fetch(`/api/app/portofolios/${id}`, {
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

  const deletePortofolio = async (id: number) => {
    loading.value = true
    try {
      return await $fetch(`/api/app/portofolios/${id}`, {
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
    getPortofolios,
    createPortofolio,
    updatePortofolio,
    deletePortofolio,
    getPortofolio,
    getPortofolioBySlug,
  }
}
