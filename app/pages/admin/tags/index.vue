<template>
  <NuxtLayout name="admin">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Tags</h1>
      <UButton icon="i-heroicons-plus" @click="openCreateModal">Add Tag</UButton>
    </div>

    <!-- Data Table -->
    <UCard>
      <UTable :data="tags" :columns="columns" :loading="loading">
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
    <UModal :title="isEditMode ? 'Edit Tag' : 'Add Tag'" v-model:open="isModalOpen">
      <template #body>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Tag Name" name="name">
            <UInput class="w-full" v-model="state.name" placeholder="Tag Name" />
          </UFormField>
          
          <div class="flex justify-end gap-2 mt-6">
            <UButton color="neutral" variant="ghost" @click="isModalOpen = false">Cancel</UButton>
            <UButton type="submit" :loading="loading">Save</UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal title="Delete Tag?" description="Are you sure you want to delete this tag? This action cannot be undone." v-model:open="isDeleteModalOpen">
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
import type { TagDto } from '~/types/dto/tag.dto'

definePageMeta({
  middleware: 'auth',
  name: 'admin-tags'
})

useHead({ title: 'Admin Tags' })

// Composables
const { getTags, createTag, updateTag, deleteTag, loading } = useTags()
const toast = useToast()

// Data State
const tags = ref<TagDto[]>([])
const page = ref(1)
const limit = 10
const totalItems = ref(0)
const pageCount = ref(10)

// Modal State
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isEditMode = ref(false)
const selectedTag = ref<TagDto | null>(null)

// Form Schema
const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty('Name is required'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  id: undefined as number | undefined,
  name: ''
})

// Columns
const columns: TableColumn<TagDto>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { id: 'actions', header: 'Actions' }
]

// Methods
const fetchData = async () => {
  try {
     const res : any = await getTags(page.value, limit)
     if (res?.data) {
       tags.value = res.data.items || []
       totalItems.value = res.data.meta?.total_items || 0
       pageCount.value = res.data.meta?.total_pages || 1
     } else if (Array.isArray(res)) {
        tags.value = res
        totalItems.value = res.length
     }
  } catch (e) {
     toast.add({ title: 'Error', description: 'Failed to fetch tags', color: 'error' })
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
  selectedTag.value = null
  resetForm()
  isModalOpen.value = true
}

const openEditModal = (tag: TagDto) => {
  isEditMode.value = true
  selectedTag.value = tag
  
  // Populate form
  state.id = tag.id
  state.name = tag.name

  isModalOpen.value = true
}

const confirmDelete = (tag: TagDto) => {
  selectedTag.value = tag
  isDeleteModalOpen.value = true
}

const resetForm = () => {
  state.id = undefined
  state.name = ''
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    if (isEditMode.value && state.id) {
       await updateTag(state.id, { name: event.data.name })
       toast.add({ title: 'Success', description: 'Tag updated successfully' })
    } else {
       await createTag({ name: event.data.name })
       toast.add({ title: 'Success', description: 'Tag created successfully' })
    }
    isModalOpen.value = false
    fetchData()
  } catch (e: any) {
    const msg = e.response?._data?.message || e.message || (isEditMode.value ? 'Failed to update tag' : 'Failed to create tag')
    toast.add({ title: 'Error', description: msg, color: 'error' })
  }
}

const handleDelete = async () => {
  if (!selectedTag.value) return
  
  try {
    await deleteTag(selectedTag.value.id)
    toast.add({ title: 'Success', description: 'Tag deleted successfully' })
    isDeleteModalOpen.value = false
    fetchData()
  } catch (e: any) {
    const msg = e.response?._data?.message || e.message || 'Failed to delete tag'
    toast.add({ title: 'Error', description: msg, color: 'error' })
  }
}

</script>
