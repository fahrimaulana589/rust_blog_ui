<script setup lang="ts">
const currentPage = defineModel('currentPage', { type: String, default: 'home' })
const isOpen = ref(false)

const props = defineProps<{
  profile: any
}>()

const navItems = [
  { id: 'home', label: 'Home', link: '/' },
  { id: 'blog', label: 'Blog', link: '/blog' },
  { id: 'project', label: 'Projects', link: '/project' },
  { id: 'portfolio', label: 'Portfolio', link: '/portofolio' },
]

const navigate = (link: string) => {
  navigateTo(link)
  isOpen.value = false
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <UContainer>
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center gap-3 cursor-pointer" @click="navigate('/')">
            <UAvatar :src="profile.profile_image" alt="Profile" size="sm" />
            <span class="text-xl font-bold text-primary-500 dark:text-primary-400">Dev.</span>
          </div>
          
          <div class="hidden md:flex space-x-1 items-center">
            <UButton 
              v-for="item in navItems" 
              :key="item.id"
              variant="ghost" 
              :color="$route.path.startsWith(item.link) && item.link !== '/' || $route.path === item.link ? 'primary' : 'neutral'"
              :to="item.link"
            >
              {{ item.label }}
            </UButton>
            <div class="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-2"></div>
            <UButton color="primary" variant="solid" icon="i-heroicons-envelope">Contact Me</UButton>
          </div>

          <div class="md:hidden flex items-center">
            <UButton icon="i-heroicons-bars-3" color="neutral" variant="ghost" @click="isOpen = !isOpen" />
          </div>
        </div>
      </UContainer>
      
      <!-- Mobile Menu -->
      <div v-if="isOpen" class="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <UContainer class="py-4 space-y-2">
          <UButton 
            v-for="item in navItems" 
            :key="item.id"
            block
            variant="ghost"
            :color="$route.path.startsWith(item.link) && item.link !== '/' || $route.path === item.link ? 'primary' : 'neutral'"
            @click="navigate(item.link)"
            class="justify-start"
          >
            {{ item.label }}
          </UButton>
        </UContainer>
      </div>
    </nav>
</template>
