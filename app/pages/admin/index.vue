<template>
  <NuxtLayout name="admin">
    <h1 class="text-2xl font-bold">Admin Dashboard</h1>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth',
    name: 'admin'
  })

  useHead({
    title: 'Admin Dashboard'
  })
</script>

<style>

</style>