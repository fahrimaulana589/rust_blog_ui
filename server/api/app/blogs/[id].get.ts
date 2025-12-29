export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const res = await $fetch(`http://localhost:8080/app/blogs/${id}`, {
    method: 'GET'
  })
  return res
})
