<script setup lang="ts">
const props = defineProps<{
  profile: any
}>()
</script>

<template>
  <footer class="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12 mt-auto">
      <UContainer>
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="text-center md:text-left flex items-center gap-3">
            <div class="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
               <span class="text-xl font-bold text-primary-600 dark:text-primary-400">Dev.</span>
            </div>
            <p class="text-gray-500 text-sm">© 2023 {{ profile.full_name }}. <br class="sm:hidden"/> All rights reserved.</p>
          </div>
          <div class="flex gap-4">
            <UButton icon="i-simple-icons-github" variant="ghost" color="neutral" />
            <UButton icon="i-simple-icons-twitter" variant="ghost" color="neutral" />
            <UButton icon="i-simple-icons-linkedin" variant="ghost" color="neutral" />
          </div>
        </div>
      </UContainer>
    </footer>
</template>
