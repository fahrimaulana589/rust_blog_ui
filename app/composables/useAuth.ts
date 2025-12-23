export const useAuth = () => {
  const token = useCookie<string | null>('auth_token')
  const user = useState<any | null>('auth_user', () => null)
  const loading = useState<boolean>('auth_loading', () => false)

  const login = async (username: string, password: string) => {
    loading.value = true

    try {
      const res = await $fetch<any>('/api/login', {
        method: 'POST',
        body: {
          username,
          password
        }
      })

      // SuccessResponse_LoginResponseDto
      if (res?.data?.token) {
        token.value = res.data.token
        user.value = res.data.user ?? res.data
        return true
      }

      return false
    } catch (err) {
      console.error('Login failed:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/admin/login')
  }

  return {
    token,
    user,
    loading,
    login,
    logout
  }
}
