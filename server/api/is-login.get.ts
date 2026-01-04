export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization')

  return await $fetch('http://localhost:8080/app/islogin', {
    method: 'GET',
    headers: {
      'Authorization': authHeader || ''
    }
  })
})