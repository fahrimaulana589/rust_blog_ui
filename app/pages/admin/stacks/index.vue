<template>
  <NuxtLayout name="admin">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Stacks</h1>
      <UButton icon="i-heroicons-plus" @click="openCreateModal">Add Stack</UButton>
    </div>

    <!-- Data Table -->
    <UCard>
      <UTable :data="stacks" :columns="columns" :loading="loading">
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
    <UModal :title="isEditMode ? 'Edit Stack' : 'Add Stack'" v-model:open="isModalOpen">
      <template #body>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Stack Name" name="nama_stack">
            <UInput class="w-full" v-model="state.nama_stack" placeholder="e.g. Vue.js" />
          </UFormField>
          
          <div class="flex justify-end gap-2 mt-6">
            <UButton color="neutral" variant="ghost" @click="isModalOpen = false">Cancel</UButton>
            <UButton type="submit" :loading="loading">Save</UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal title="Delete Stack?" description="Are you sure you want to delete this stack? This action cannot be undone." v-model:open="isDeleteModalOpen">
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
import type { StackDto } from '~/types/dto/stack.dto'

definePageMeta({
  middleware: 'auth',
  name: 'admin-stacks'
})

useHead({ title: 'Admin Stacks' })

// Composables
const { getStacks, createStack, updateStack, deleteStack, loading } = useStacks()
const toast = useToast()

// Data State
const stacks = ref<StackDto[]>([])
const page = ref(1)
const limit = 10
const totalItems = ref(0) // Backend might not return meta for now based on useStacks logic, but prepared.
const pageCount = ref(10)
// Modal State
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isEditMode = ref(false)
const selectedStack = ref<StackDto | null>(null)

// Form Schema
const schema = v.object({
  nama_stack: v.pipe(v.string(), v.nonEmpty('Name is required'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  id: undefined as number | undefined,
  nama_stack: ''
})

// Columns
const columns: TableColumn<StackDto>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'nama_stack', header: 'Name' },
  { id: 'actions', header: 'Actions' }
]

// Methods
const fetchData = async () => {
  try {
     const res : any = await getStacks(page.value, limit)
     // Adapt based on useStacks return
     if (res.data) {
      stacks.value = res.data.items
      totalItems.value = res.data.meta?.total_items
      pageCount.value = res.data.meta?.total_pages
     }
  } catch (e) {
     toast.add({ title: 'Error', description: 'Failed to fetch stacks', color: 'error' })
  }
}

// Watch page change
watch(page, () => {
  fetchData()
})

// Lifecycle
onMounted(() => {
  fetchData()
})

const openCreateModal = () => {
  isEditMode.value = false
  selectedStack.value = null
  resetForm()
  isModalOpen.value = true
}

const openEditModal = (stack: StackDto) => {
  isEditMode.value = true
  selectedStack.value = stack
  
  // Populate form
  state.id = stack.id
  state.nama_stack = stack.nama_stack

  isModalOpen.value = true
}

const confirmDelete = (stack: StackDto) => {
  selectedStack.value = stack
  isDeleteModalOpen.value = true
}

const resetForm = () => {
  state.id = undefined
  state.nama_stack = ''
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    if (isEditMode.value && state.id) {
       await updateStack(state.id, { nama_stack: event.data.nama_stack })
       toast.add({ title: 'Success', description: 'Stack updated successfully' })
    } else {
       await createStack({ nama_stack: event.data.nama_stack })
       toast.add({ title: 'Success', description: 'Stack created successfully' })
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
  if (!selectedStack.value) return
  
  try {
    await deleteStack(selectedStack.value.id)
    toast.add({ title: 'Success', description: 'Stack deleted successfully' })
    isDeleteModalOpen.value = false
    fetchData()
  } catch (e: any) {
    const msg = e.response?._data?.message || e.message || 'Failed to delete stack'
    toast.add({ title: 'Error', description: msg, color: 'error' })
  }
}

</script>
