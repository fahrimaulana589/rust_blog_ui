export const useProfile = () => {
  const token = useCookie<string | null>('auth_token')
  const loading = useState<boolean>('auth_loading', () => false)

  const get_profile = async () => {
    loading.value = true
    try {
      const res = await $fetch<any>('/api/app/profile', {
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

  return {
    get_profile,
    loading
  }
}