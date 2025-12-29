<script setup lang="ts">
const { getBlogs } = useBlogs()
const page = ref(1)
const pageCount = 6

const { data: blogResponse, error } = await useAsyncData('blogs-list', async () => {
  const res = await getBlogs(page.value, pageCount)
  console.log('Blog response:', res) 
  return res && res.data ? res.data : { items: [], meta: { total_items: 0, page: 1, per_page: pageCount, total_pages: 0 } }
}, {
  watch: [page]
})

if (error.value) {
  console.error('Blog async data error:', error.value)
}

const blogs = computed(() => blogResponse.value?.items || [])
const total = computed(() => blogResponse.value?.meta?.total_items || 0)

const navigate = (path: string) => {
  navigateTo(path)
}
</script>

<template>
  <NuxtLayout>
    <main class="min-h-[calc(100vh-200px)] py-12">
        <UContainer>
          <div class="text-center mb-16 max-w-2xl mx-auto">
            <UBadge variant="soft" color="primary" class="mb-4">Articles</UBadge>
            <h1 class="text-4xl font-bold mb-4">Blog & Insights</h1>
            <p class="text-gray-500 dark:text-gray-400">
              Kumpulan artikel tentang pengembangan software, arsitektur sistem, dan teknologi terkini.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <UCard 
              v-for="blog in blogs" 
              :key="blog.id"
              class="group cursor-pointer hover:ring-2 hover:ring-primary-500/50 transition-all duration-300"
              :ui="{ 
                header: 'p-0' 
              }"
              @click="navigate(`/blog/${blog.slug}`)"
            >
              <template #header>
                <div class="aspect-video w-full overflow-hidden relative">
                  <img :src="blog.thumbnail ?? undefined" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute top-3 left-3">
                    <UBadge color="neutral" class="text-gray-900">{{ blog.category?.name }}</UBadge>
                  </div>
                </div>
              </template>
              <h3 class="text-lg font-bold mb-2 group-hover:text-primary-500 transition-colors">{{ blog.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ blog.excerpt }}</p>
            </UCard>
          </div>

          <div class="flex justify-center" v-if="total > pageCount">
            <UPagination v-model:page="page" :page-count="pageCount" :total="total" />
          </div>
        </UContainer>
    </main>
  </NuxtLayout>
</template>