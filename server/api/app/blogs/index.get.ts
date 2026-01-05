export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  return await $fetch(`${config.public.apiBase}/app/blogs`, {
    method: 'GET',
    query
  })
})
