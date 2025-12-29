export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const res = await $fetch('http://localhost:8080/app/tags', {
    method: 'GET',
    query
  })
  return res
})
