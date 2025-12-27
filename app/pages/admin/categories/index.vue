<template>
  <NuxtLayout name="admin">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Categories</h1>
      <UButton icon="i-heroicons-plus" @click="openCreateModal">Add Category</UButton>
    </div>

    <!-- Data Table -->
    <UCard>
      <UTable :data="categories" :columns="columns" :loading="loading">
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
    <UModal :title="isEditMode ? 'Edit Category' : 'Add Category'" v-model:open="isModalOpen">
      <template #body>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Category Name" name="name">
            <UInput class="w-full" v-model="state.name" placeholder="Category Name" />
          </UFormField>
          
          <div class="flex justify-end gap-2 mt-6">
            <UButton color="neutral" variant="ghost" @click="isModalOpen = false">Cancel</UButton>
            <UButton type="submit" :loading="loading">Save</UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal title="Delete Category?" description="Are you sure you want to delete this category? This action cannot be undone." v-model:open="isDeleteModalOpen">
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
import type { CategoryDto } from '~/types/dto/category.dto'

definePageMeta({
  middleware: 'auth',
  name: 'admin-categories'
})

useHead({ title: 'Admin Categories' })

// Composables
const { getCategories, createCategory, updateCategory, deleteCategory, loading } = useCategories()
const toast = useToast()

// Data State
const categories = ref<CategoryDto[]>([])
const page = ref(1)
const limit = 10
const totalItems = ref(0)
const pageCount = ref(10)

// Modal State
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isEditMode = ref(false)
const selectedCategory = ref<CategoryDto | null>(null)

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
const columns: TableColumn<CategoryDto>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' },
  { id: 'actions', header: 'Actions' }
]

// Methods
const fetchData = async () => {
  try {
     const res : any = await getCategories(page.value, limit)
     if (res?.data) {
       categories.value = res.data.items || []
       totalItems.value = res.data.meta?.total_items || 0
       pageCount.value = res.data.meta?.total_pages || 1
     } else if (Array.isArray(res)) {
        categories.value = res
        totalItems.value = res.length
     }
  } catch (e) {
     toast.add({ title: 'Error', description: 'Failed to fetch categories', color: 'error' })
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
  selectedCategory.value = null
  resetForm()
  isModalOpen.value = true
}

const openEditModal = (category: CategoryDto) => {
  isEditMode.value = true
  selectedCategory.value = category
  
  // Populate form
  state.id = category.id
  state.name = category.name

  isModalOpen.value = true
}

const confirmDelete = (category: CategoryDto) => {
  selectedCategory.value = category
  isDeleteModalOpen.value = true
}

const resetForm = () => {
  state.id = undefined
  state.name = ''
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    if (isEditMode.value && state.id) {
       await updateCategory(state.id, { name: event.data.name })
       toast.add({ title: 'Success', description: 'Category updated successfully' })
    } else {
       await createCategory({ name: event.data.name })
       toast.add({ title: 'Success', description: 'Category created successfully' })
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
  if (!selectedCategory.value) return
  
  try {
    await deleteCategory(selectedCategory.value.id)
    toast.add({ title: 'Success', description: 'Category deleted successfully' })
    isDeleteModalOpen.value = false
    fetchData()
  } catch (e: any) {
    const msg = 'Failed to delete category'
    toast.add({ title: 'Error', description: msg, color: 'error' })
  }
}

</script>
