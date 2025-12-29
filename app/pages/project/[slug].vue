<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const { getProjectBySlug } = useProjects()

const { data: selectedItem } = await useAsyncData(`project-${slug}`, async () => {
  const res = await getProjectBySlug(slug)
  return res || null // useProjects getProjectBySlug returns res.data directly based on my edit
})
</script>

<template>
  <NuxtLayout>
    <main class="min-h-[calc(100vh-200px)] py-12">
        <UContainer class="max-w-4xl" v-if="selectedItem">
           <UButton icon="i-heroicons-arrow-left" variant="ghost" class="mb-8 pl-0" to="/project">
            Back to Projects
          </UButton>
          
          <UCard :ui="{ header: 'p-6 sm:p-8', body: 'p-6 sm:p-8' }">
            <template #header>
              <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1 class="text-3xl font-bold mb-2">{{ selectedItem.nama_projek }}</h1>
                  <p class="text-gray-500 dark:text-gray-400">Started on {{ selectedItem.tanggal_mulai }}</p>
                  <p class="text-gray-500 dark:text-gray-400">Finished on {{ selectedItem.tanggal_selesai }}</p>
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
                  <UProgress v-model="selectedItem.progress" color="primary" indicator />
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
  </NuxtLayout>
</template>