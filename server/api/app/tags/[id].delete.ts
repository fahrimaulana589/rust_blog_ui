export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch(`${config.public.apiBase}/app/tags/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': authHeader || ''
    }
  })
})
