<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
// --- MOCK DATA ---

const selectedItem = ref({
    id: 1,
    judul: "Revamping E-Commerce Analytics",
    slug: "case-study-ecommerce",
    deskripsi: "Studi kasus bagaimana kami meningkatkan performa load data hingga 200% pada dashboard admin.",
    project: {
        nama_projek: "E-Commerce Dashboard V2"
    }
  })
</script>

<template>
    <main class="min-h-[calc(100vh-200px)] py-12">
        <UContainer class="max-w-5xl">
           <UButton icon="i-heroicons-arrow-left" variant="ghost" class="mb-8 pl-0" to="/portofolio">
            Back to Showcase
          </UButton>
          
          <div class="text-center mb-16">
            <UBadge color="primary" variant="subtle" class="mb-6">Case Study</UBadge>
            <h1 class="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">{{ selectedItem.judul }}</h1>
            <p class="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">{{ selectedItem.deskripsi }}</p>
          </div>
          
          <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
             <div class="w-full aspect-[21/9] bg-gray-100 dark:bg-gray-800 relative">
                <img :src="`https://source.unsplash.com/random/1200x600?tech,${selectedItem.id}`" class="w-full h-full object-cover" />
             </div>
             
             <div class="p-8 md:p-16">
                <div class="grid md:grid-cols-12 gap-12">
                    <div class="md:col-span-8 prose prose-lg dark:prose-invert">
                        <h3>The Challenge</h3>
                        <p>
                            Proyek <strong>{{ selectedItem.project.nama_projek }}</strong> ini bertujuan untuk menyelesaikan masalah efisiensi data yang dihadapi klien.
                            Tantangan utamanya adalah mengintegrasikan sistem lama dengan arsitektur modern tanpa mengganggu operasional harian.
                        </p>
                        <h3>The Solution</h3>
                        <p>
                            Kami menggunakan pendekatan microservices dengan <strong>NestJS</strong> untuk memastikan skalabilitas. Di sisi frontend, <strong>React</strong> digunakan untuk memberikan pengalaman pengguna yang interaktif dan responsif.
                        </p>
                        <ul>
                          <li>Optimasi query database hingga 40% lebih cepat.</li>
                          <li>Implementasi caching layer menggunakan Redis.</li>
                          <li>Deployment otomatis dengan CI/CD pipeline.</li>
                        </ul>
                    </div>
                    
                    <div class="md:col-span-4 space-y-8">
                        <div class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 space-y-6">
                            <div>
                                <span class="block text-xs font-bold text-gray-400 uppercase mb-1 tracking-wider">Client</span>
                                <span class="text-gray-900 dark:text-white font-medium">Confidential Corp.</span>
                            </div>
                            <div class="h-px bg-gray-200 dark:bg-gray-700"></div>
                            <div>
                                <span class="block text-xs font-bold text-gray-400 uppercase mb-1 tracking-wider">Services</span>
                                <span class="text-gray-900 dark:text-white font-medium">Fullstack Dev, UI/UX Design</span>
                            </div>
                            <div class="h-px bg-gray-200 dark:bg-gray-700"></div>
                            <div>
                                <span class="block text-xs font-bold text-gray-400 uppercase mb-1 tracking-wider">Year</span>
                                <span class="text-gray-900 dark:text-white font-medium">2023</span>
                            </div>
                        </div>
                        
                        <UButton size="xl" block color="neutral" icon="i-heroicons-arrow-top-right-on-square">
                           Visit Live Site
                        </UButton>
                    </div>
                </div>
             </div>
          </div>
        </UContainer>
    </main>
</template>