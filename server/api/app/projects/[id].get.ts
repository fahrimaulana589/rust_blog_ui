export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  return await $fetch(`http://localhost:8080/app/projects/${id}`, {
    method: 'GET'
  })
})
