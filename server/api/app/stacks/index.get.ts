export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const authHeader = getHeader(event, 'Authorization')

  console.log('[Proxy] GET Stacks Query:', query)

  try {
    const res = await $fetch('http://localhost:8080/app/stacks', {
      method: 'GET',
      headers: {
        'Authorization': authHeader || ''
      },
      query
    })
    console.log('[Proxy] GET Stacks Response Data Type:', typeof (res as any)?.data)
    console.log('[Proxy] GET Stacks Response Data IsArray:', Array.isArray((res as any)?.data))
    return res
  } catch (err: any) {
    console.error('[Proxy] GET Stacks Failed:', err.message)
    throw err
  }
})
