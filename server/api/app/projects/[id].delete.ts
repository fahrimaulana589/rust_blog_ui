export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch(`${config.public.apiBase}/app/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': authHeader || ''
    }
  })
})
