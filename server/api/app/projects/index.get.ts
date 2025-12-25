export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const authHeader = getHeader(event, 'Authorization')

  console.log('[Proxy] GET Projects Query:', query)

  try {
    const res = await $fetch('http://localhost:8080/app/projects', {
      method: 'GET',
      headers: {
        'Authorization': authHeader || ''
      },
      query
    })
    console.log('[Proxy] GET Projects Success, Items:', (res as any)?.data?.items?.length)
    return res
  } catch (err: any) {
    console.error('[Proxy] GET Projects Failed:', err.message)
    throw err
  }
})
