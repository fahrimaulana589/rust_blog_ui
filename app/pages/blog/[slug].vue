<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const profile = useProfileData() // Needed for author info

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

// Simulate fetch by slug
const selectedItem = ref({
  id: 1,
  title: "Memahami Arsitektur Microservices dengan NestJS",
  slug: "memahami-microservices-nestjs",
  content: `Microservices adalah arsitektur yang membagi aplikasi menjadi layanan kecil... (Konten lengkap artikel disini). Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  excerpt: "Panduan lengkap memulai microservices menggunakan framework Node.js paling populer.",
  status: "published",
  created_at: "2023-10-15",
  view_count: 1250,
  thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
  category: categories.value[1]!,
  tags: [tags.value[1]!, tags.value[2]!],
  published_at: "2023-10-15",
  updated_at: "2023-10-15"
})

const navigate = (path: string) => {
  navigateTo(path)
}
</script>

<template>
     <main class="min-h-[calc(100vh-200px)] py-12">
        <UContainer class="max-w-3xl">
          <UButton icon="i-heroicons-arrow-left" variant="ghost" class="mb-8 pl-0" to="/blog">
            Back to Blog
          </UButton>
          
          <div class="mb-8 text-center">
            <UBadge color="primary" variant="subtle" size="lg" class="mb-4">{{ selectedItem.category?.name }}</UBadge>
            <h1 class="text-3xl sm:text-4xl font-bold mb-6 leading-tight">{{ selectedItem.title }}</h1>
            
            <div class="flex items-center justify-center gap-6 text-gray-500 dark:text-gray-400 text-sm border-y border-gray-100 dark:border-gray-800 py-4">
              <div class="flex items-center gap-2">
                 <UAvatar :src="profile.profile_image" size="xs" />
                 <span>{{ profile.full_name }}</span>
              </div>
              <span>{{ selectedItem.created_at }}</span>
              <span>{{ selectedItem.view_count }} views</span>
            </div>
          </div>
          
          <img :src="selectedItem.thumbnail" class="w-full aspect-video object-cover rounded-2xl mb-10 shadow-lg ring-1 ring-gray-200 dark:ring-gray-800" />
          
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
</template>