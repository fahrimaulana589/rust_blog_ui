export default defineNuxtRouteMiddleware((to, from) => {
    const { token } = useAuth()

    if (!token.value && to.path !== '/admin/login') {
        return navigateTo('/admin/login')
    }

    if (token.value && to.path === '/admin/login') {
        return navigateTo('/admin')
    }
})