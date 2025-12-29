<script setup lang="ts">
const profile = useProfileData()
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 transition-colors">
    <AppNavbar :profile="profile" />
    <slot />
    <AppFooter :profile="profile" />
  </div>
</template>
