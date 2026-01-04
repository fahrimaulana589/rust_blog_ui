import type { StackDto, CreateStackDto, UpdateStackDto } from '../types/dto/stack.dto'

export const useStacks = () => {
  const token = useCookie<string | null>('auth_token')
  const loading = useState<boolean>('stacks_loading', () => false)

  interface Meta {
    page: number;
    per_page: number;
    total_pages: number;
    total_items: number;
  }

  interface StacksResponse {
    message: string;
    data: {
      items: StackDto[];
      meta?: Meta;
    }
  }

  const getStacks = async (page = 1, per_page = 10) => {
    loading.value = true
    try {
      const res = await $fetch<StacksResponse>('/api/app/stacks', {
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
    } finally {
      loading.value = false
    }
  }

  const getStack = async (id: number) => {
    loading.value = true
    try {
      return await $fetch<StackDto>(`/api/app/stacks/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
    } finally {
      loading.value = false
    }
  }

  const createStack = async (payload: CreateStackDto) => {
    loading.value = true
    try {
      return await $fetch('/api/app/stacks', {
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

  const updateStack = async (id: number, payload: UpdateStackDto) => {
    loading.value = true
    try {
      return await $fetch(`/api/app/stacks/${id}`, {
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

  const deleteStack = async (id: number) => {
    loading.value = true
    try {
      return await $fetch(`/api/app/stacks/${id}`, {
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
    getStacks,
    createStack,
    updateStack,
    deleteStack,
    getStack,
  }
}
