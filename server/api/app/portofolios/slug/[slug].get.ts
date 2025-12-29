export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const res = await $fetch(`http://localhost:8080/app/portofolios/slug/${slug}`, {
    method: 'GET'
  })
  return res
})
