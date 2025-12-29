<script setup lang="ts">
const { get_profile } = useProfile()
const { getBlogs } = useBlogs()
const { getPortofolios } = usePortofolios()

const { data: profile } = await useAsyncData('home-profile', async () => {
  const res = await get_profile()
  return (res && typeof res !== 'boolean' && res.data) ? res.data : null
})

const { data: blogs } = await useAsyncData('home-blogs', async () => {
  const res = await getBlogs(1, 3)
  return res && res.data && res.data.items ? res.data.items : []
})

const { data: portfolios } = await useAsyncData('home-portfolios', async () => {
  const res = await getPortofolios(1, 4)
  return res && res.data && res.data.items ? res.data.items : []
})

const navigate = (path: string) => {
  navigateTo(path)
}
</script>

<template>
  <NuxtLayout>
    <main class="min-h-[calc(100vh-200px)]">
      
      <!-- HOME PAGE -->
      <div>
        <!-- Hero -->
        <div class="relative overflow-hidden py-24 sm:py-32">
          <UContainer class="text-center max-w-3xl">
            <div class="flex justify-center mb-8">
              <UAvatar 
                :src="profile?.profile_image" 
                size="3xl" 
                class="ring-4 ring-white dark:ring-gray-900 shadow-xl"
              />
            </div>
            
            <UBadge color="primary" variant="subtle" size="md" class="mb-6 rounded-full px-3 py-1">
              <span class="w-2 h-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
              {{ profile?.availability }}
            </UBadge>
            
            <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
              Hi, I'm {{ profile?.full_name }} <br/>
              <span class="text-primary-500 dark:text-primary-400">{{ profile?.role }}</span>
            </h1>
            
            <p class="text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
              {{ profile?.summary }}
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <UButton size="xl" icon="i-heroicons-briefcase" to="/project">View Projects</UButton>
              <UButton size="xl" variant="outline" icon="i-heroicons-sparkles" to="/portofolio">See Portfolio</UButton>
            </div>
            
            <div class="mt-12 flex justify-center gap-4">
              <UButton v-if="profile?.resume_url" icon="i-heroicons-document-text" color="neutral" variant="ghost" size="lg" :to="profile.resume_url" target="_blank" />
              <UButton v-if="profile?.email" icon="i-heroicons-envelope" color="neutral" variant="ghost" size="lg" :to="`mailto:${profile.email}`" />
            </div>
          </UContainer>
        </div>

        <!-- Featured Portfolio -->
        <div class="py-20 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
          <UContainer>
            <div class="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
              <div>
                <h2 class="text-3xl font-bold mb-2">Featured Case Studies</h2>
                <p class="text-gray-500 dark:text-gray-400">Deep dive into some of my best works.</p>
              </div>
              <UButton variant="link" icon="i-heroicons-arrow-right" trailing to="/portofolio">View All Portfolio</UButton>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div 
                v-for="item in portfolios" 
                :key="item.id"
                class="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ring-1 ring-gray-200 dark:ring-gray-800"
                @click="navigate(`/portofolio/${item.slug}`)"
              >
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10" />
                <img 
                  :src="`https://placehold.co/800x600?text=${encodeURIComponent(item.judul)}`" 
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div class="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <UBadge color="primary" variant="solid" class="mb-3">Case Study</UBadge>
                  <h2 class="text-2xl font-bold text-white mb-2">{{ item.judul }}</h2>
                  <p class="text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {{ item.deskripsi }}
                  </p>
                </div>
              </div>
            </div>
          </UContainer>
        </div>

        <!-- Latest Blog -->
        <div class="py-20">
          <UContainer>
            <div class="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
              <div>
                <h2 class="text-3xl font-bold mb-2">Latest Articles</h2>
                <p class="text-gray-500 dark:text-gray-400">Thoughts on technology, coding, and productivity.</p>
              </div>
              <UButton variant="link" icon="i-heroicons-arrow-right" trailing to="/blog">Read Blog</UButton>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <UCard 
                v-for="blog in blogs" 
                :key="blog.id"
                class="group cursor-pointer hover:ring-2 hover:ring-primary-500/50 transition-all duration-300"
                :ui="{ 
                  body: 'flex-1 flex flex-col p-6', 
                  header: 'p-0 sm:p-0' 
                }"
                @click="navigate(`/blog/${blog.slug}`)"
              >
                <template #header>
                  <div class="aspect-video w-full overflow-hidden relative">
                    <img 
                      :src="blog.thumbnail ?? undefined" 
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div class="absolute top-3 left-3">
                      <UBadge color="neutral" class="text-gray-900 shadow-sm">{{ blog.category?.name }}</UBadge>
                    </div>
                  </div>
                </template>
                
                <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span class="flex items-center gap-1"><UIcon name="i-heroicons-calendar" /> {{ blog.published_at || blog.created_at }}</span>
                  <span class="flex items-center gap-1"><UIcon name="i-heroicons-eye" /> {{ blog.view_count }} views</span>
                </div>
                
                <h3 class="text-lg font-bold mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
                  {{ blog.title }}
                </h3>
                
                <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4 flex-1">
                  {{ blog.excerpt }}
                </p>
                
                <div class="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span v-for="tag in blog.tags" :key="tag?.id" class="text-xs text-primary-500 font-medium">#{{ tag?.name }}</span>
                </div>
              </UCard>
            </div>
          </UContainer>
        </div>
      </div>

    </main>
  </NuxtLayout>
</template>