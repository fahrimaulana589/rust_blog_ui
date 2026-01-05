export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch(`${config.public.apiBase}/app/islogin`, {
    method: 'GET',
    headers: {
      'Authorization': authHeader || ''
    }
  })
})