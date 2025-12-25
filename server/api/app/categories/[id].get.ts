export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch(`http://localhost:8080/app/categories/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': authHeader || ''
    }
  })
})
