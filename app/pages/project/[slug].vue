<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
// --- MOCK DATA ---

const stacks = ref([
  { id: 1, nama_stack: "React" },
  { id: 2, nama_stack: "Tailwind" },
  { id: 3, nama_stack: "Node.js" },
  { id: 4, nama_stack: "PostgreSQL" }
])

const selectedItem = ref({
  id: 1,
  nama_projek: "E-Commerce Dashboard V2",
  slug: "ecommerce-dashboard-v2",
  deskripsi: "Dashboard analitik untuk manajemen toko online dengan fitur realtime reporting.",
  status: "Completed",
  progress: 100,
  tanggal_mulai: "2023-01-10",
  link_demo: "https://demo.com",
  repository: "https://github.com",
  stacks: [stacks.value[0]!, stacks.value[1]!, stacks.value[3]!],
  tanggal_selesai: "2023-04-10",
  created_at: "2023-01-10",
  updated_at: "2023-04-10"
})
</script>

<template>
    <main class="min-h-[calc(100vh-200px)] py-12">
        <UContainer class="max-w-4xl">
           <UButton icon="i-heroicons-arrow-left" variant="ghost" class="mb-8 pl-0" to="/project">
            Back to Projects
          </UButton>
          
          <UCard :ui="{ header: 'p-6 sm:p-8', body: 'p-6 sm:p-8' }">
            <template #header>
              <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1 class="text-3xl font-bold mb-2">{{ selectedItem.nama_projek }}</h1>
                  <p class="text-gray-500 dark:text-gray-400">Started on {{ selectedItem.tanggal_mulai }}</p>
                </div>
                <UBadge :color="selectedItem.status === 'Completed' ? 'success' : 'warning'" size="lg" variant="subtle">{{ selectedItem.status }}</UBadge>
              </div>
            </template>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="md:col-span-2 space-y-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3">About the Project</h3>
                  <p class="text-gray-600 dark:text-gray-300 leading-relaxed">{{ selectedItem.deskripsi }}</p>
                </div>
                
                 <div>
                  <h3 class="text-lg font-semibold mb-3">Progress</h3>
                  <UProgress :value="selectedItem.progress" color="primary" indicator />
                </div>
              </div>
              
              <div class="space-y-6">
                <UCard :ui="{ body: 'p-4' }" class="bg-gray-50 dark:bg-gray-800/50">
                   <h3 class="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">Tech Stack</h3>
                   <div class="flex flex-wrap gap-2">
                    <UBadge v-for="stack in selectedItem.stacks" :key="stack.id" color="neutral" class="text-gray-700 dark:text-gray-200 dark:bg-gray-700 ring-1 ring-gray-200 dark:ring-gray-700">
                      {{ stack?.nama_stack }}
                    </UBadge>
                  </div>
                </UCard>
                
                <div class="flex flex-col gap-3">
                  <UButton v-if="selectedItem.repository" icon="i-simple-icons-github" :to="selectedItem.repository" target="_blank" color="neutral" block>
                    View Repository
                  </UButton>
                  <UButton v-if="selectedItem.link_demo" icon="i-heroicons-globe-alt" :to="selectedItem.link_demo" target="_blank" variant="solid" block>
                    Live Demo
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>
        </UContainer>
    </main>
</template>