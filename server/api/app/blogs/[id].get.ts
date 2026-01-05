export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  return await $fetch(`${config.public.apiBase}/app/blogs/${id}`, {
    method: 'GET'
  })
})
