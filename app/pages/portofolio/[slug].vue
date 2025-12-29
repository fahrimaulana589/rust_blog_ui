<script setup lang="ts">
import { lo } from '@nuxt/ui/runtime/locale/index.js'

const route = useRoute()
const slug = route.params.slug as string
const { getPortofolioBySlug } = usePortofolios()

const { data: selectedItem } = await useAsyncData(`portfolio-${slug}`, async () => {
  const res = await getPortofolioBySlug(slug)
  return res || null
})
console.log(selectedItem.value)
</script>

<template>
  <NuxtLayout>
    <main class="min-h-[calc(100vh-200px)] py-12">
        <UContainer class="max-w-5xl" v-if="selectedItem">
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
                <img :src="`https://placehold.co/1200x600?text=${encodeURIComponent(selectedItem.judul)}`" class="w-full h-full object-cover" />
             </div>
             
             <div class="p-8 md:p-16">
                <div class="grid md:grid-cols-12 gap-12">
                    <div class="md:col-span-8 prose prose-lg dark:prose-invert">
                        <h3>About the Project</h3>
                        <p>
                            {{ selectedItem.project.deskripsi }}
                        </p>
                    </div>
                    
                    <div class="md:col-span-4 space-y-6">
                        <UCard :ui="{ body: 'p-6 space-y-6' }" class="bg-gray-50 dark:bg-gray-800/50 border-0 dark:border dark:border-gray-800 shadow-none ring-1 ring-gray-200 dark:ring-gray-800">
                            <div v-if="selectedItem.project?.status">
                                <h3 class="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Status</h3>
                                <span class="capitalize font-medium" :class="selectedItem.project.status === 'Completed' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'">
                                  {{ selectedItem.project.status }}
                                </span>
                            </div>
                            
                            <div v-if="selectedItem.project?.stacks?.length">
                                <h3 class="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">Tech Stack</h3>
                                <div class="flex flex-wrap gap-2">
                                  <UBadge 
                                    v-for="stack in selectedItem.project.stacks" 
                                    :key="stack.id" 
                                    color="neutral" 
                                    class="text-gray-700 dark:text-gray-200 dark:bg-gray-700 ring-1 ring-gray-200 dark:ring-gray-700"
                                  >
                                    {{ stack.nama_stack }}
                                  </UBadge>
                                </div>
                            </div>

                            <div v-if="selectedItem.project?.tanggal_mulai">
                                <h3 class="text-xs font-bold uppercase text-gray-400 mb-2 tracking-wider">Timeline</h3>
                                <div class="space-y-1">
                                  <div class="flex justify-between text-sm">
                                    <span class="text-gray-500">Started</span>
                                    <span class="font-medium text-gray-900 dark:text-white">{{ selectedItem.project.tanggal_mulai }}</span>
                                  </div>
                                  <div v-if="selectedItem.project?.tanggal_selesai" class="flex justify-between text-sm">
                                    <span class="text-gray-500">Finished</span>
                                    <span class="font-medium text-gray-900 dark:text-white">{{ selectedItem.project.tanggal_selesai }}</span>
                                  </div>
                                </div>
                            </div>
                        </UCard>
                        
                        <div class="flex flex-col gap-3">
                           <UButton 
                              v-if="selectedItem.project?.link_demo" 
                              :to="selectedItem.project.link_demo" 
                              target="_blank"
                              block 
                              color="primary" 
                              size="lg"
                              icon="i-heroicons-globe-alt"
                            >
                               Live Demo
                            </UButton>

                            <UButton 
                              v-if="selectedItem.project?.repository" 
                              :to="selectedItem.project.repository" 
                              target="_blank"
                              block 
                              color="neutral" 
                              size="lg"
                              icon="i-simple-icons-github"
                            >
                               View Repository
                            </UButton>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </UContainer>
    </main>
  </NuxtLayout>
</template>