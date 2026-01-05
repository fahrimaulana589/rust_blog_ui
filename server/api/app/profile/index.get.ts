export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  return await $fetch(`${config.public.apiBase}/app/profile`, {
    method: 'GET'
  })
})