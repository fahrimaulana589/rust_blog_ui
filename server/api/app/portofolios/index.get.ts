export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const authHeader = getHeader(event, 'Authorization')

  try {
    const res = await $fetch('http://localhost:8080/app/portofolios', {
      method: 'GET',
      headers: {
        'Authorization': authHeader || ''
      },
      query
    })
    return res
  } catch (err: any) {
    throw err
  }
})
