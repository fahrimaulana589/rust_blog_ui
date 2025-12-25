export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch(`http://localhost:8080/app/projects/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': authHeader || ''
    }
  })
})
