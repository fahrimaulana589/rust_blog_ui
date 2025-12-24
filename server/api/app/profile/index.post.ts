export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const headers = event.node.req.headers
  
  return await $fetch('http://localhost:8080/app/profile', {
    method: 'POST',             
    body,
    headers
  }) 
})