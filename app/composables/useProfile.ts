import type { ProfileDto } from '../types/dto/profile.dto'

export const useProfile = () => {
  const token = useCookie<string | null>('auth_token')
  const loading = useState<boolean>('auth_loading', () => false)

  const get_profile = async () => {
    loading.value = true
    try {
      const res = await $fetch<{ data: ProfileDto }>('/api/app/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      return res
    } catch (err) {
      console.error('Profile failed:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const update_profile = async (data: ProfileDto) => {
    loading.value = true
    try {
      const res = await $fetch<any>('/api/app/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`
        },
        body: data
      })
      return res
    } catch (err) {
      console.error('Profile failed:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    get_profile,
    update_profile,
    loading
  }
}