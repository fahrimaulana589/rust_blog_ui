<template>
  <NuxtLayout name="admin">
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: 'auth',
    name: 'admin'
  })
</script>

<style>

</style>