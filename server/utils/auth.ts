export const getAuthToken = (event: any) => {
  const authHeader = getHeader(event, 'Authorization')
  if (authHeader) return authHeader

  const token = getCookie(event, 'auth_token')
  if (token) return `Bearer ${token}`

  return ''
}
