export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch(`${config.public.apiBase}/app/categories`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader || ''
    },
    body
  })
})
