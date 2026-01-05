export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params?.id

  return await $fetch(`${config.public.apiBase}/app/portofolios/${id}`, {
    method: 'GET'
  })
})
