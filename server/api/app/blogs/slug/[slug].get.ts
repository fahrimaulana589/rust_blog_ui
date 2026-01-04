export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  return await $fetch(`http://localhost:8080/app/blogs/slug/${slug}`, {
    method: 'GET'
  })
})
