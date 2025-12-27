<template>
  <NuxtLayout name="admin">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Portofolios</h1>
      <UButton icon="i-heroicons-plus" @click="openCreateModal">Add Portofolio</UButton>
    </div>

    <!-- Data Table -->
    <UCard>
      <UTable :data="portofolios" :columns="columns" :loading="loading">
        <template #is_active-cell="{ row }">
          <UBadge :color="row.original.is_active ? 'success' : 'neutral'" variant="subtle">{{ row.original.is_active ? 'Active' : 'Inactive' }}</UBadge>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex gap-2">
            <UButton icon="i-heroicons-pencil-square" color="warning" variant="ghost" size="xs" @click="openEditModal(row.original)" />
            <UButton icon="i-heroicons-trash" color="error" variant="ghost" size="xs" @click="confirmDelete(row.original)" />
          </div>
        </template>
      </UTable>
      
      <!-- Pagination -->
      <div class="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700" v-if="totalItems > 0">
        <UPagination v-model:page="page" :items-per-page="limit" :total="totalItems" />
      </div>
    </UCard>

    <!-- Create/Edit Modal -->
    <UModal :title="isEditMode ? 'Edit Portofolio' : 'Add Portofolio'" v-model:open="isModalOpen">
      <template #body>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Judul" name="judul">
            <UInput class="w-full" v-model="state.judul" placeholder="Judul" />
          </UFormField>

          <UFormField label="Project" name="project_id">
            <USelectMenu
              v-model="state.project_id"
              :items="projects"
              value-key="id"
              label-key="nama_projek"
              placeholder="Select Project"
              class="w-full"
              searchable
            />
          </UFormField>

          <UFormField label="Deskripsi" name="deskripsi">
            <UTextarea class="w-full" v-model="state.deskripsi" placeholder="Deskripsi" />
          </UFormField>

          <UFormField label="Is Active" name="is_active">
             <UCheckbox v-model="state.is_active" label="Active" />
          </UFormField>
          
          <div class="flex justify-end gap-2 mt-6">
            <UButton color="neutral" variant="ghost" @click="isModalOpen = false">Cancel</UButton>
            <UButton type="submit" :loading="loading">Save</UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal title="Delete Portofolio?" description="Are you sure you want to delete this portofolio? This action cannot be undone." v-model:open="isDeleteModalOpen">
      <template #footer>
        <div class="flex justify-end gap-2 w-full">
           <UButton color="neutral" variant="ghost" @click="isDeleteModalOpen = false">Cancel</UButton>
           <UButton color="error" :loading="loading" @click="handleDelete">Delete</UButton>
        </div>
      </template>
    </UModal>

  </NuxtLayout>
</template>

<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent, TableColumn } from '@nuxt/ui'
import type { PortofolioDto } from '~/types/dto/portofolio.dto'
import type { ProjectDto } from '~/types/dto/project.dto'
import { usePortofolios } from '~/composables/usePortofolios'
import { useProjects } from '~/composables/useProjects'

definePageMeta({
  middleware: 'auth',
  name: 'admin-portofolios'
})

useHead({ title: 'Admin Portofolios' })

// Composables
const { getPortofolios, createPortofolio, updatePortofolio, deletePortofolio, loading } = usePortofolios()
const { getProjects } = useProjects()
const toast = useToast()

// Data State
const portofolios = ref<PortofolioDto[]>([])
const projects = ref<ProjectDto[]>([])
const page = ref(1)
const limit = 10
const totalItems = ref(0)
const pageCount = ref(10)

// Modal State
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isEditMode = ref(false)
const selectedPortofolio = ref<PortofolioDto | null>(null)

// Form Schema
const schema = v.object({
  judul: v.pipe(v.string(), v.nonEmpty('Judul is required')),
  project_id: v.number('Project is required'),
  deskripsi: v.pipe(v.string(), v.nonEmpty('Deskripsi is required')),
  is_active: v.boolean('Is Active is required'),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  id: undefined as number | undefined,
  judul: '',
  project_id: undefined as number | undefined,
  deskripsi: '',
  is_active: true,
})

// Columns
const columns: TableColumn<PortofolioDto>[] = [
  { accessorKey: 'judul', header: 'Judul' },
  { accessorKey: 'project_id', header: 'Project ID' },
  { accessorKey: 'deskripsi', header: 'Deskripsi' },
  { accessorKey: 'is_active', header: 'Is Active' },
  { id: 'actions', header: 'Actions' }
]

// Methods
const fetchData = async () => {
  try {
     const res : any = await getPortofolios(page.value, limit)
     if (res?.data) {
       portofolios.value = res.data.items || []
       totalItems.value = res.data.meta?.total_items || 0
       pageCount.value = res.data.meta?.total_pages || 1
     } else if (Array.isArray(res)) {
        portofolios.value = res
        totalItems.value = res.length
     }
  } catch (e) {
     toast.add({ title: 'Error', description: 'Failed to fetch portofolios', color: 'error' })
  }
}

const fetchProjects = async () => {
  try {
    const res: any = await getProjects(1, -1) // Fetch enough projects
    if (res?.data?.items) {
      projects.value = res.data.items
    }
  } catch (e) {
    console.error('Failed to fetch projects', e)
    toast.add({ title: 'Error', description: 'Failed to fetch projects', color: 'error' })
  }
}

// Watch page change
watch(page, () => {
  fetchData()
})

// Lifecycle
onMounted(() => {
  fetchData()
  fetchProjects()
})

const openCreateModal = () => {
  isEditMode.value = false
  selectedPortofolio.value = null
  resetForm()
  isModalOpen.value = true
}

const openEditModal = (portofolio: PortofolioDto) => {
  isEditMode.value = true
  selectedPortofolio.value = portofolio
  
  // Populate form
  state.id = portofolio.id
  state.judul = portofolio.judul
  state.project_id = portofolio.project_id
  state.deskripsi = portofolio.deskripsi
  state.is_active = portofolio.is_active

  isModalOpen.value = true
}

const confirmDelete = (portofolio: PortofolioDto) => {
  selectedPortofolio.value = portofolio
  isDeleteModalOpen.value = true
}

const resetForm = () => {
  state.id = undefined
  state.judul = ''
  state.project_id = undefined
  state.deskripsi = ''
  state.is_active = true
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    if (isEditMode.value && state.id) {
       await updatePortofolio(state.id, { 
         judul: event.data.judul, 
         project_id: event.data.project_id, 
         deskripsi: event.data.deskripsi, 
         is_active: event.data.is_active 
       })
       toast.add({ title: 'Success', description: 'Portofolio updated successfully' })
    } else {
       await createPortofolio({ 
         judul: event.data.judul, 
         project_id: event.data.project_id, 
         deskripsi: event.data.deskripsi, 
         is_active: event.data.is_active 
       })
       toast.add({ title: 'Success', description: 'Portofolio created successfully' })
    }
    isModalOpen.value = false
    fetchData()
  } catch (e: any) {
    if(e.response?.status === 400){
      const dsc = Object.values(e.response._data.data.errors)
      .flat()
      .map((e: any) => '* '+e)
      .join('\n')
    
      toast.add({ title: e.response._data.data.message, description: dsc, color: 'error' })
    } else{
      toast.add({ title: 'Error', description: 'Failed to save portofolio', color: 'error' })
    }
  }
}

const handleDelete = async () => {
  if (!selectedPortofolio.value) return
  
  try {
    await deletePortofolio(selectedPortofolio.value.id)
    toast.add({ title: 'Success', description: 'Portofolio deleted successfully' })
    isDeleteModalOpen.value = false
    fetchData()
  } catch (e: any) {
    const msg = e.response?._data?.message || e.message || 'Failed to delete portofolio'
    toast.add({ title: 'Error', description: msg, color: 'error' })
  }
}

</script>
