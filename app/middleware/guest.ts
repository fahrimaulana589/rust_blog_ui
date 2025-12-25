export default defineNuxtRouteMiddleware(async (to, from) => {
  const { checkLogin } = useAuth()

  const isLogged = await checkLogin()
  if (isLogged) {
    return navigateTo({ name: 'admin' })
  }
})
