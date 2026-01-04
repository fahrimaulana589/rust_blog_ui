export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  return await $fetch(`http://localhost:8080/app/portofolios/slug/${slug}`, {
    method: 'GET'
  })
})
