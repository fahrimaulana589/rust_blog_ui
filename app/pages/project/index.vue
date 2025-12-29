<script setup lang="ts">
const { getProjects } = useProjects()
const page = ref(1)
const pageCount = 6

const { data: projectResponse } = await useAsyncData('projects-list', async () => {
  const res = await getProjects(page.value, pageCount)
  return res && res.data ? res.data : { items: [], meta: { total_items: 0, page: 1, per_page: pageCount, total_pages: 0 } }
}, {
  watch: [page]
})

const projects = computed(() => projectResponse.value?.items || [])
const total = computed(() => projectResponse.value?.meta?.total_items || 0)

const navigate = (path: string) => {
  navigateTo(path)
}
</script>

<template>
  <NuxtLayout>
    <main class="min-h-[calc(100vh-200px)] py-12">
        <UContainer>
          <div class="text-center mb-16 max-w-2xl mx-auto">
             <UBadge variant="soft" color="primary" class="mb-4">Portfolio</UBadge>
            <h1 class="text-4xl font-bold mb-4">Projects</h1>
            <p class="text-gray-500 dark:text-gray-400">
              Daftar proyek teknis yang telah saya kerjakan dengan detail progress dan teknologi.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <UCard 
              v-for="project in projects" 
              :key="project.id"
              class="hover:ring-2 hover:ring-primary-500/50 transition-all duration-300 flex flex-col"
              :ui="{ body: 'flex-1 flex flex-col' }"
            >
              <div class="flex justify-between items-start mb-4">
                <div class="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-600 dark:text-primary-400">
                  <UIcon name="i-heroicons-command-line" class="w-6 h-6" />
                </div>
                <UBadge :color="project.status === 'Completed' ? 'success' : 'warning'" variant="subtle" size="sm">
                  {{ project.status }}
                </UBadge>
              </div>
              
              <h3 class="text-xl font-bold mb-2">{{ project.nama_projek }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-1">{{ project.deskripsi }}</p>
              
              <div class="mb-6 space-y-2">
                <div class="flex justify-between text-xs font-medium">
                  <span class="text-gray-500 dark:text-gray-400">Completion</span>
                  <span>{{ project.progress }}%</span>
                </div>
                <UProgress v-model="project.progress" color="primary" size="sm" />
              </div>

              <div class="flex flex-wrap gap-2 mb-6">
                <UBadge v-for="stack in project.stacks" :key="stack.id" color="neutral" variant="soft" size="xs">
                  {{ stack?.nama_stack }}
                </UBadge>
              </div>

              <UButton block variant="soft" color="neutral" @click="navigate(`/project/${project.slug}`)">
                View Details <UIcon name="i-heroicons-arrow-right" class="ml-2" />
              </UButton>
            </UCard>
          </div>

          <div class="flex justify-center" v-if="total > pageCount">
            <UPagination v-model:page="page" :page-count="pageCount" :total="total" />
          </div>
        </UContainer>
    </main>
  </NuxtLayout>
</template>