<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <UButton color="error" @click="logout">Logout</UButton>
  </div>
</template>

<script lang="ts" setup>
  const { logout } = useAuth()
  definePageMeta({
    middleware: 'auth'
  })
</script>

<style>

</style>