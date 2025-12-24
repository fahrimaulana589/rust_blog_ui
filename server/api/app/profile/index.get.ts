export default defineEventHandler(async (event) => {
  const headers = event.node.req.headers
  
  return await $fetch('http://localhost:8080/app/profile', {
    method: 'GET',
    headers: headers
  }) 
})