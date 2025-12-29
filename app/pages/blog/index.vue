<script setup lang="ts">
// --- MOCK DATA ---

const categories = ref([
  { id: 1, name: "Tutorial" },
  { id: 2, name: "Technology" },
  { id: 3, name: "Career" }
])

const tags = ref([
  { id: 1, name: "React" },
  { id: 2, name: "NestJS" },
  { id: 3, name: "Productivity" }
])

const blogs = ref([
  {
    id: 1,
    title: "Memahami Arsitektur Microservices dengan NestJS",
    slug: "memahami-microservices-nestjs",
    excerpt: "Panduan lengkap memulai microservices menggunakan framework Node.js paling populer.",
    created_at: "2023-10-15",
    view_count: 1250,
    thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
    category: categories.value[1],
    tags: [tags.value[1], tags.value[2]],
  },
  {
    id: 2,
    title: "Tips Produktivitas untuk Developer Remote",
    slug: "tips-produktivitas-remote",
    excerpt: "Bagaimana menjaga keseimbangan kerja dan hidup saat bekerja dari rumah.",
    created_at: "2023-11-02",
    view_count: 890,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    category: categories.value[2],
    tags: [tags.value[2]],
  }
])

const navigate = (path: string) => {
  navigateTo(path)
}
</script>

<template>
     <main class="min-h-[calc(100vh-200px)] py-12">
        <UContainer>
          <div class="text-center mb-16 max-w-2xl mx-auto">
            <UBadge variant="soft" color="primary" class="mb-4">Articles</UBadge>
            <h1 class="text-4xl font-bold mb-4">Blog & Insights</h1>
            <p class="text-gray-500 dark:text-gray-400">
              Kumpulan artikel tentang pengembangan software, arsitektur sistem, dan teknologi terkini.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <img :src="blog.thumbnail" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute top-3 left-3">
                    <UBadge color="neutral" class="text-gray-900">{{ blog.category?.name }}</UBadge>
                  </div>
                </div>
              </template>
              <h3 class="text-lg font-bold mb-2 group-hover:text-primary-500 transition-colors">{{ blog.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{{ blog.excerpt }}</p>
            </UCard>
          </div>
        </UContainer>
     </main>
</template>