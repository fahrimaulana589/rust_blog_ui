<script setup lang="ts">
// --- MOCK DATA ---

const portfolios = ref([
 {
    id: 1,
    judul: "Revamping E-Commerce Analytics",
    slug: "case-study-ecommerce",
    deskripsi: "Studi kasus bagaimana kami meningkatkan performa load data hingga 200% pada dashboard admin.",
  },
  {
    id: 2,
    judul: "Digitizing Local SME Inventory",
    slug: "case-study-inventory",
    deskripsi: "Transformasi pencatatan manual ke digital untuk efisiensi operasional.",
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
            <UBadge variant="soft" color="primary" class="mb-4">Case Studies</UBadge>
            <h1 class="text-4xl font-bold mb-4">Portfolio Showcase</h1>
            <p class="text-gray-500 dark:text-gray-400">
              Studi kasus mendalam dari proyek-proyek terpilih.
            </p>
          </div>
          <div class="space-y-16">
            <div 
              v-for="(item, idx) in portfolios" 
              :key="item.id" 
              class="flex flex-col md:flex-row gap-8 lg:gap-12 items-center"
              :class="{ 'md:flex-row-reverse': idx % 2 === 1 }"
            >
              <div class="w-full md:w-1/2 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800 group cursor-pointer" @click="navigate(`/portofolio/${item.slug}`)">
                <div class="aspect-[4/3] relative overflow-hidden">
                  <img 
                    :src="`https://source.unsplash.com/random/800x600?tech,${item.id}`" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
              </div>
              
              <div class="w-full md:w-1/2 space-y-6">
                <div class="flex items-center gap-3">
                   <span class="text-primary-500 font-bold tracking-wider text-sm uppercase">0{{ idx + 1 }}</span>
                   <div class="h-px w-12 bg-primary-500"></div>
                   <span class="text-gray-400 text-sm font-medium uppercase">Case Study</span>
                </div>
                
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">{{ item.judul }}</h2>
                <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{{ item.deskripsi }}</p>
                
                <div class="pt-2">
                  <UButton size="lg" variant="ghost" color="neutral" class="pl-0 hover:bg-transparent" @click="navigate(`/portofolio/${item.slug}`)">
                    <span class="text-primary-600 dark:text-primary-400 text-lg font-medium flex items-center gap-2 group">
                      Read Full Story 
                      <UIcon name="i-heroicons-arrow-right" class="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </UContainer>
    </main>
</template>