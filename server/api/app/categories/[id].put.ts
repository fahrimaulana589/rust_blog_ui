export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const body = await readBody(event)
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch(`http://localhost:8080/app/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': authHeader || ''
    },
    body
  })
})
