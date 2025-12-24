<template>
  <NuxtLayout name="admin">
    <UBreadcrumb :items="items" />
    <h1 class="text-2xl font-bold my-4">Admin Profile</h1>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  name: 'admin-profile'
})

useHead({
  title: 'Admin Profile'
})

const items = ref([
  {
    label: 'Dashboard',
    icon: 'i-lucide-book-open',
    to: {name: 'admin'}
  },
  {
    label: 'Profile',
    icon: 'i-lucide-box',
    to: {name: 'admin-profile'}
  }
])

</script>

<style>

</style>