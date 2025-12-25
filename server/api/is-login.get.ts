export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization')

  try {
    await $fetch('http://localhost:8080/app/islogin', {
      method: 'GET',
      headers: {
        'Authorization': authHeader || ''
      }
    })
    return { status: true }
  } catch (error: any) {
    if (error.statusCode === 401) {
      return { status: false }
    }
    throw error
  }
})