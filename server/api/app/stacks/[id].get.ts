export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  return await $fetch(`http://localhost:8080/app/stacks/${id}`, {
    method: 'GET'
  })
})
