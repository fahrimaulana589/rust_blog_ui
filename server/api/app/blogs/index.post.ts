export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch('http://localhost:8080/app/blogs', {
    method: 'POST',
    headers: {
      'Authorization': authHeader || ''
    },
    body
  })
})
