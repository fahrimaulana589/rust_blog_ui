export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch(`http://localhost:8080/app/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': authHeader || ''
    },
    body
  })
})
