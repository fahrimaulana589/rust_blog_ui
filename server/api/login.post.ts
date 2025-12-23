export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await $fetch('http://localhost:8080/login', {
    method: 'POST',
    body
  })
})
