export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  return await $fetch(`${config.public.apiBase}/forgot-password`, {
    method: 'POST',
    body
  })
})
