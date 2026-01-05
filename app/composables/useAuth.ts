export const useAuth = () => {
  const token = useCookie<string | null>('auth_token')
  const email = useState<string | null>('auth_email', () => null)
  const loading = useState<boolean>('auth_loading', () => false)

  const login = async (username: string, password: string) => {
    loading.value = true

    try {
      const res = await $fetch<any>('/api/login', {
        method: 'POST',
        body: {
          username: username,
          password: password
        }
      })

      // SuccessResponse_LoginResponseDto
      if (res?.data?.token) {
        token.value = res.data.token
        email.value = res.data.email
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
    email.value = null
    navigateTo({ name: 'admin-login' })
  }

  const forgotPassword = async (email: string) => {
    loading.value = true

    try {
      const res = await $fetch<any>('/api/forgot-password', {
        method: 'POST',
        body: {
          email: email
        }
      })

      // SuccessResponse_ForgotPasswordResponseDto
      if (res?.message) {
        return res.message
      }

      return false
    } catch (err) {
      console.error('Forgot password failed:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (token: string, new_password: string) => {
    loading.value = true

    try {
      const res = await $fetch<any>('/api/reset-password', {
        method: 'POST',
        body: {
          token: token,
          new_password: new_password
        }
      })

      // SuccessResponse_ResetPasswordResponseDto
      if (res?.message) {
        return res.message
      }

      return false
    } catch (err) {
      console.error('Reset password failed:', err)
      return false
    } finally {
      loading.value = false
    }
  }


  const checkLogin = async () => {
    loading.value = true
    try {
      const res = await $fetch<any>('/api/is-login', {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })

      if (res?.status === false) {
        throw new Error('Unauthorized')
      }

      return true
    } catch (err) {
      token.value = null
      email.value = null
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    token,
    email,
    loading,
    login,
    logout,
    forgotPassword,
    resetPassword,
    checkLogin
  }
}
