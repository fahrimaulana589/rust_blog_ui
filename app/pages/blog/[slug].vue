<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const profile = await useProfileData() // Needed for author info

const { getBlogBySlug } = useBlogs()

const { data: selectedItem } = await useAsyncData(`blog-${slug}`, async () => {
  const res = await getBlogBySlug(slug)
  return res || null
})

const navigate = (path: string) => {
  navigateTo(path)
}
</script>

<template>
  <NuxtLayout>
    <main class="min-h-[calc(100vh-200px)] py-12">
      <UContainer class="max-w-3xl" v-if="selectedItem">
        <UButton icon="i-heroicons-arrow-left" variant="ghost" class="mb-8 pl-0" to="/blog">
          Back to Blog
        </UButton>
        
        <div class="mb-8 text-center">
          <UBadge color="primary" variant="subtle" size="lg" class="mb-4">{{ selectedItem.category?.name }}</UBadge>
          <h1 class="text-3xl sm:text-4xl font-bold mb-6 leading-tight">{{ selectedItem.title }}</h1>
          
          <div class="flex items-center justify-center gap-6 text-gray-500 dark:text-gray-400 text-sm border-y border-gray-100 dark:border-gray-800 py-4">
            <div class="flex items-center gap-2" v-if="profile">
                <UAvatar :src="profile?.profile_image" size="xs" />
                <span>{{ profile?.full_name }}</span>
            </div>
            <span>{{ selectedItem.published_at || selectedItem.created_at }}</span>
            <span>{{ selectedItem.view_count }} views</span>
          </div>
        </div>
        
        <img :src="selectedItem.thumbnail || undefined" class="w-full aspect-video object-cover rounded-2xl mb-10 shadow-lg ring-1 ring-gray-200 dark:ring-gray-800" />
        
        <div class="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          {{ selectedItem.content }}
        </div>
        
        <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h4 class="font-bold mb-4">Tags</h4>
          <div class="flex gap-2">
              <UBadge v-for="tag in selectedItem.tags" :key="tag.id" color="neutral" variant="soft">#{{ tag?.name }}</UBadge>
            </div>
        </div>
      </UContainer>
    </main>
  </NuxtLayout>
</template>