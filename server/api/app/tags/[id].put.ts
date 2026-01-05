export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id
  const body = await readBody(event)
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch(`${config.public.apiBase}/app/tags/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': authHeader || ''
    },
    body
  })
})
