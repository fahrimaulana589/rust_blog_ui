export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const authHeader = getAuthToken(event)

  try {
    const res = await $fetch('http://localhost:8080/app/profile', {
      method: 'POST',
      headers: {
        'Authorization': authHeader
      },
      body
    })
    return res
  } catch (err: any) {
    throw err
  }
})