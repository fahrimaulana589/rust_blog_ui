<template>
  <NuxtLayout name="admin">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Projects</h1>
      <UButton icon="i-heroicons-plus" @click="openCreateModal">Add Project</UButton>
    </div>

    <!-- Data Table -->
    <UCard>
      <UTable :data="projects" :columns="columns" :loading="loading">
        <template #status-cell="{ row }">
          <UBadge :color="row.original.status === 'COMPLETED' ? 'success' : 'neutral'" variant="subtle">{{ row.original.status }}</UBadge>
        </template>
        <template #progress-cell="{ row }">
          <UProgress v-model="row.original.progress" />
        </template>
        <template #link_demo-cell="{ row }">
          <UButton v-if="row.original.link_demo" :to="row.original.link_demo" target="_blank" icon="i-heroicons-globe-alt" size="xs" color="neutral" variant="ghost" />
        </template>
        <template #repository-cell="{ row }">
          <UButton v-if="row.original.repository" :to="row.original.repository" target="_blank" icon="i-simple-icons-github" size="xs" color="neutral" variant="ghost" />
        </template>
        <template #actions-cell="{ row }">
          <div class="flex gap-2">
            <UButton icon="i-heroicons-pencil-square" color="warning" variant="ghost" size="xs" @click="openEditModal(row.original)" />
            <UButton icon="i-heroicons-trash" color="error" variant="ghost" size="xs" @click="confirmDelete(row.original)" />
          </div>
        </template>
      </UTable>
      
      <!-- Pagination (Optional handling) -->
      <div class="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
        <UPagination v-model:page="page" :items-per-page="limit" :total="totalItems" />
      </div>
    </UCard>

    <!-- Create/Edit Modal -->
    <UModal :title="isEditMode ? 'Edit Project' : 'Add Project'" v-model:open="isModalOpen">
      <template #body>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Project Name" name="nama_projek">
            <UInput class="w-full" v-model="state.nama_projek" placeholder="My Awesome Project" />
          </UFormField>
          
          <UFormField label="Description" name="deskripsi">
             <UTextarea class="w-full" v-model="state.deskripsi" placeholder="Describe your project..." />
          </UFormField>

          <UFormField label="Status" name="status">
            <USelect class="w-full" v-model="state.status" :items="['ONGOING', 'COMPLETED', 'DRAFT']" />
          </UFormField>

          <UFormField label="Progress" name="progress">
            <UInput class="w-full" v-model.number="state.progress" type="number" min="0" max="100" />
          </UFormField>

          <UFormField label="Demo Link" name="link_demo">
            <UInput class="w-full" v-model="state.link_demo" placeholder="https://..." icon="i-heroicons-link" />
          </UFormField>

          <UFormField label="Repository" name="repository">
            <UInput class="w-full" v-model="state.repository" placeholder="https://github.com/..." icon="i-simple-icons-github" />
          </UFormField>
          
          <UFormField label="Start Date" name="tanggal_mulai">
              <UInput class="w-full" v-model="state.tanggal_mulai" type="date" />
          </UFormField>

          <UFormField label="End Date" name="tanggal_selesai">
              <UInput class="w-full" v-model="state.tanggal_selesai" type="date" />
          </UFormField>

          <UFormField label="Stacks" name="stack_ids">
             <USelectMenu class="w-full" v-model="state.stack_ids" :items="stacks" label-key="nama_stack" value-key="id" multiple placeholder="Select stacks" />
          </UFormField>

          <div class="flex justify-end gap-2 mt-6">
            <UButton color="neutral" variant="ghost" @click="isModalOpen = false">Cancel</UButton>
            <UButton type="submit" :loading="loading">Save</UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal title="Delete Project?" description="Are you sure you want to delete this project? This action cannot be undone." v-model:open="isDeleteModalOpen">
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
import type { ProjectDto, CreateProjectDto } from '~/types/dto/project.dto'
import type { StackDto } from '~/types/dto/stack.dto'

definePageMeta({
  middleware: 'auth',
  name: 'admin-projects'
})

useHead({ title: 'Admin Projects' })

// Composables
const { getProjects, createProject, updateProject, deleteProject, loading } = useProjects()
const { getStacks } = useStacks()
const toast = useToast()

// Data State
const projects = ref<ProjectDto[]>([])
const stacks = ref<StackDto[]>([])
const page = ref(1)
const pageCount = ref(10)
const totalItems = ref(0)
const limit = 10

// Modal State
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isEditMode = ref(false)
const selectedProject = ref<ProjectDto | null>(null)

// Form Schema
const schema = v.object({
  nama_projek: v.pipe(v.string(), v.nonEmpty('Name is required')),
  deskripsi: v.pipe(v.string(), v.nonEmpty('Description is required')),
  status: v.pipe(v.string(), v.nonEmpty('Status is required'),v.picklist(['ONGOING', 'COMPLETED', 'DRAFT'])), // enum(['ongoing', 'completed', 'draft'])
  progress: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
  link_demo: v.nullable(v.string()), // Optional in API? Assuming optional or string
  repository: v.nullable(v.string()),
  tanggal_mulai: v.pipe(v.string(), v.nonEmpty('Start date is required')),
  tanggal_selesai: v.nullable(v.string()),
  stack_ids: v.array(v.number())
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  id: undefined as number | undefined,
  nama_projek: '',
  deskripsi: '',
  status: 'ONGOING',
  progress: 0,
  link_demo: null as string | null | undefined,
  repository: null as string | null | undefined,
  tanggal_mulai: '',
  tanggal_selesai: null as string | null | undefined,
  stack_ids: [] as number[]
})

// Columns
const columns: TableColumn<ProjectDto>[] = [
  { accessorKey: 'nama_projek', header: 'Name' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'progress', header: 'Progress' },
  { accessorKey: 'link_demo', header: 'Demo' },
  { accessorKey: 'repository', header: 'Repo' },
  { id: 'actions', header: 'Actions' }
]

// Methods
const fetchData = async () => {
  try {
     const res = await getProjects(page.value, limit)
     if (res?.data) {
        projects.value = res.data.items
        totalItems.value = res.data.meta.total_items
        pageCount.value = res.data.meta.total_pages
     }
  } catch (e) {
     toast.add({ title: 'Error', description: 'Failed to fetch projects', color: 'error' })
  }
}

const fetchStacks = async () => {
   const res = await getStacks(1,-1)
   console.log(res)
   if (res) stacks.value = res.data.items
}

// Watch page change
watch(page, () => {
  fetchData()
})

// Lifecycle
onMounted(() => {
  fetchData()
  fetchStacks()
})

const openCreateModal = () => {
  isEditMode.value = false
  selectedProject.value = null
  resetForm()
  isModalOpen.value = true
}

const openEditModal = (project: ProjectDto) => {
  isEditMode.value = true
  selectedProject.value = project
  
  // Populate form
  state.id = project.id
  state.nama_projek = project.nama_projek
  state.deskripsi = project.deskripsi
  state.status = project.status
  state.progress = project.progress
  state.link_demo = project.link_demo
  state.repository = project.repository
  state.tanggal_mulai = project.tanggal_mulai.split('T')[0]? `${project.tanggal_mulai.split('T')[0]}` : '' // Format YYYY-MM-DD
  state.tanggal_selesai = project.tanggal_selesai ? project.tanggal_selesai.split('T')[0] : null
  
  // Map stack objects to IDs
  state.stack_ids = project.stacks ? project.stacks.map(s => s.id) : []

  isModalOpen.value = true
}

const confirmDelete = (project: ProjectDto) => {
  selectedProject.value = project
  isDeleteModalOpen.value = true
}

const resetForm = () => {
  state.id = undefined
  state.nama_projek = ''
  state.deskripsi = ''
  state.status = ''
  state.progress = 0
  state.link_demo = ''
  state.repository = ''
  state.tanggal_mulai = ''
  state.tanggal_selesai = null
  state.stack_ids = []
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    if (isEditMode.value && state.id) {
       await updateProject(state.id, event.data)
       toast.add({ title: 'Success', description: 'Project updated successfully' })
    } else {
       await createProject(event.data)
       toast.add({ title: 'Success', description: 'Project created successfully' })
    }
    isModalOpen.value = false
    fetchData()
  } catch (e: any) {
    if(e.response.status === 400){
      const dsc = Object.values(e.response._data.data.errors)
      .flat()
      .map(e => '* '+e)
      .join('\n')
    
      toast.add({ title: e.response._data.data.message, description: dsc, color: 'error' })
    } else{
      toast.add({ title: 'Error', description: 'Failed to create category', color: 'error' })
    }
  }
}

const handleDelete = async () => {
  if (!selectedProject.value) return
  
  try {
    await deleteProject(selectedProject.value.id)
    toast.add({ title: 'Success', description: 'Project deleted successfully' })
    isDeleteModalOpen.value = false
    fetchData()
  } catch (e: any) {
    const msg = 'Failed to delete project'
    toast.add({ title: 'Error', description: msg, color: 'error' })
  }
}

</script>
