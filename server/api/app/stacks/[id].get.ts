export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  const res = await $fetch(`http://localhost:8080/app/stacks/${id}`, {
    method: 'GET'
  })
  return res
})
