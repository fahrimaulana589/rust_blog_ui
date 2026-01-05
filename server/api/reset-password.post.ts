export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  return await $fetch(`${config.public.apiBase}/reset-password`, {
    method: 'POST',
    body
  })
})
