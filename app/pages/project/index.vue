<script setup lang="ts">
// --- MOCK DATA ---

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
    stacks: [stacks.value[0]!, stacks.value[1]!, stacks.value[3]!],
  },
  {
    id: 2,
    nama_projek: "Sistem Manajemen Inventaris",
    slug: "inventory-system",
    deskripsi: "Aplikasi pencatatan stok barang berbasis web untuk UMKM.",
    status: "In Progress",
    progress: 65,
    stacks: [stacks.value[2]!, stacks.value[3]!],
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
             <UBadge variant="soft" color="primary" class="mb-4">Portfolio</UBadge>
            <h1 class="text-4xl font-bold mb-4">Projects</h1>
            <p class="text-gray-500 dark:text-gray-400">
              Daftar proyek teknis yang telah saya kerjakan dengan detail progress dan teknologi.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <UProgress :value="project.progress" color="primary" size="sm" />
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
        </UContainer>
    </main>
</template>