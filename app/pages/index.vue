<script setup lang="ts">
// --- MOCK DATA (Sesuai DTO) ---

const profile = useProfileData()

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
    content: "Microservices adalah arsitektur yang membagi aplikasi menjadi layanan kecil... (Konten lengkap artikel disini). Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    excerpt: "Panduan lengkap memulai microservices menggunakan framework Node.js paling populer.",
    status: "published",
    created_at: "2023-10-15",
    view_count: 1250,
    thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
    category: categories.value[1],
    tags: [tags.value[1], tags.value[2]],
    published_at: "2023-10-15",
    updated_at: "2023-10-15"
  },
  {
    id: 2,
    title: "Tips Produktivitas untuk Developer Remote",
    slug: "tips-produktivitas-remote",
    content: "Bekerja remote memiliki tantangan tersendiri... (Konten lengkap artikel disini).",
    excerpt: "Bagaimana menjaga keseimbangan kerja dan hidup saat bekerja dari rumah.",
    status: "published",
    created_at: "2023-11-02",
    view_count: 890,
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    category: categories.value[2],
    tags: [tags.value[2]],
    published_at: "2023-11-02",
    updated_at: "2023-11-02"
  }
])

const stacks = ref([
  { id: 1, nama_stack: "React" },
  { id: 2, nama_stack: "Tailwind" },
  { id: 3, nama_stack: "Node.js" },
  { id: 4, nama_stack: "PostgreSQL" }
])

const projects = ref([
  {
    id: 1,
    nama_projek: "E-Commerce Dashboard V2",
    slug: "ecommerce-dashboard-v2",
    deskripsi: "Dashboard analitik untuk manajemen toko online dengan fitur realtime reporting.",
    status: "Completed",
    progress: 100,
    tanggal_mulai: "2023-01-10",
    link_demo: "https://demo.com",
    repository: "https://github.com",
    stacks: [stacks.value[0], stacks.value[1], stacks.value[3]],
    tanggal_selesai: "2023-04-10",
    created_at: "2023-01-10",
    updated_at: "2023-04-10"
  },
  {
    id: 2,
    nama_projek: "Sistem Manajemen Inventaris",
    slug: "inventory-system",
    deskripsi: "Aplikasi pencatatan stok barang berbasis web untuk UMKM.",
    status: "In Progress",
    progress: 65,
    tanggal_mulai: "2023-08-01",
    link_demo: null,
    repository: "https://github.com",
    stacks: [stacks.value[2], stacks.value[3]],
    tanggal_selesai: null,
    created_at: "2023-08-01",
    updated_at: "2023-08-01"
  }
])

const portfolios = ref([
  {
    id: 1,
    project: projects.value[0],
    judul: "Revamping E-Commerce Analytics",
    slug: "case-study-ecommerce",
    deskripsi: "Studi kasus bagaimana kami meningkatkan performa load data hingga 200% pada dashboard admin.",
    is_active: true,
    created_at: "2023-05-01",
    updated_at: "2023-05-01"
  },
  {
    id: 2,
    project: projects.value[1],
    judul: "Digitizing Local SME Inventory",
    slug: "case-study-inventory",
    deskripsi: "Transformasi pencatatan manual ke digital untuk efisiensi operasional.",
    is_active: true,
    created_at: "2023-09-01",
    updated_at: "2023-09-01"
  }
])

const navigate = (path: string) => {
  navigateTo(path)
}
</script>

<template>
    <main class="min-h-[calc(100vh-200px)]">
      
      <!-- HOME PAGE -->
      <div>
        <!-- Hero -->
        <div class="relative overflow-hidden py-24 sm:py-32">
          <UContainer class="text-center max-w-3xl">
            <div class="flex justify-center mb-8">
              <UAvatar 
                :src="profile.profile_image" 
                size="3xl" 
                class="ring-4 ring-white dark:ring-gray-900 shadow-xl"
              />
            </div>
            
            <UBadge color="primary" variant="subtle" size="md" class="mb-6 rounded-full px-3 py-1">
              <span class="w-2 h-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
              {{ profile.availability }}
            </UBadge>
            
            <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white">
              Hi, I'm {{ profile.full_name }} <br/>
              <span class="text-primary-500 dark:text-primary-400">{{ profile.role }}</span>
            </h1>
            
            <p class="text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
              {{ profile.summary }}
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <UButton size="xl" icon="i-heroicons-briefcase" to="/project">View Projects</UButton>
              <UButton size="xl" variant="outline" icon="i-heroicons-sparkles" to="/portofolio">See Portfolio</UButton>
            </div>
            
            <div class="mt-12 flex justify-center gap-4">
              <UButton icon="i-simple-icons-github" color="neutral" variant="ghost" size="lg" to="#" target="_blank" />
              <UButton icon="i-simple-icons-linkedin" color="neutral" variant="ghost" size="lg" to="#" target="_blank" />
              <UButton icon="i-heroicons-envelope" color="neutral" variant="ghost" size="lg" to="mailto:alex@example.com" />
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
                  :src="`https://source.unsplash.com/random/800x600?tech,${item.id}`" 
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
                      :src="blog.thumbnail" 
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div class="absolute top-3 left-3">
                      <UBadge color="neutral" class="text-gray-900 shadow-sm">{{ blog.category?.name }}</UBadge>
                    </div>
                  </div>
                </template>
                
                <div class="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span class="flex items-center gap-1"><UIcon name="i-heroicons-calendar" /> {{ blog.created_at }}</span>
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
</template>