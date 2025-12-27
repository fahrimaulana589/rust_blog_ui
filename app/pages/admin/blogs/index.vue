<template>
  <NuxtLayout name="admin">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Blogs</h1>
      <UButton icon="i-heroicons-plus" @click="openCreateModal">Add Blog</UButton>
    </div>

    <!-- Data Table -->
    <UCard>
      <UTable :data="blogs" :columns="columns" :loading="loading">
        <template #status-cell="{ row }">
          <UBadge :color="row.original.status === 'published' ? 'success' : 'neutral'" variant="subtle">{{ row.original.status }}</UBadge>
        </template>
        <template #category-cell="{ row }">
          <span v-if="row.original.category">{{ row.original.category.name }}</span>
          <span v-else class="text-gray-400">-</span>
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
    <UModal :title="isEditMode ? 'Edit Blog' : 'Add Blog'" v-model:open="isModalOpen">
      <template #body>
        <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormField label="Title" name="title">
            <UInput class="w-full" v-model="state.title" placeholder="Blog Title" />
          </UFormField>

          <UFormField label="Category" name="category_id">
             <USelectMenu 
               class="w-full" 
               v-model="state.category_id" 
               :items="categories" 
               label-key="name" 
               value-key="id" 
               placeholder="Select category"
             />
          </UFormField>

          <UFormField label="Tags" name="tag_ids">
             <USelectMenu 
               class="w-full" 
               v-model="state.tag_ids" 
               :items="tags" 
               label-key="name" 
               value-key="id" 
               multiple 
               placeholder="Select tags"
             />
          </UFormField>
          
          <UFormField label="Excerpt" name="excerpt">
             <UTextarea class="w-full" v-model="state.excerpt" placeholder="Short description..." :rows="2" />
          </UFormField>
          
          <UFormField label="Content" name="content">
             <UEditor 
             class="w-full min-h-21" v-model="state.content" 
             placeholder="Full content..." 
             v-slot="{ editor }"
             content-type="html"
             >
             <UEditorToolbar :editor="editor" :items="item_editors" />
             </UEditor>
          </UFormField>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
             <UFormField label="Status" name="status">
               <USelect class="w-full" v-model="state.status" :items="['DRAFT', 'PUBLISHED', 'ARCHIVED']" />
             </UFormField>

             <UFormField label="Thumbnail URL" name="thumbnail">
               <UInput class="w-full" v-model="state.thumbnail" placeholder="https://..." icon="i-heroicons-photo" />
             </UFormField>
          </div>
          
          <div class="flex justify-end gap-2 mt-6">
            <UButton color="neutral" variant="ghost" @click="isModalOpen = false">Cancel</UButton>
            <UButton type="submit" :loading="loading">Save</UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal title="Delete Blog?" description="Are you sure you want to delete this blog? This action cannot be undone." v-model:open="isDeleteModalOpen">
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
import type { BlogDto } from '~/types/dto/blog.dto'
import type { CategoryDto } from '~/types/dto/category.dto'
import type { TagDto } from '~/types/dto/tag.dto'
import type { EditorToolbarItem } from '@nuxt/ui'

const item_editors: EditorToolbarItem[] = [
  { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold' },
  { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic' },
  { kind: 'heading', level: 1, icon: 'i-lucide-heading-1' },
  { kind: 'heading', level: 2, icon: 'i-lucide-heading-2' },
  { kind: 'heading', level: 3, icon: 'i-lucide-heading-3' },
  { kind: 'bulletList', icon: 'i-lucide-list' },
  { kind: 'codeBlock', icon: 'i-lucide-code' },
  { kind: 'orderedList', icon: 'i-lucide-list-ordered' },
  { kind: 'blockquote', icon: 'i-lucide-quote' },
  { kind: 'link', icon: 'i-lucide-link' }
]

definePageMeta({
  middleware: 'auth',
  name: 'admin-blogs'
})

useHead({ title: 'Admin Blogs' })

// Composables
const { getBlogs, createBlog, updateBlog, deleteBlog, loading } = useBlogs()
const { getCategories } = useCategories()
const { getTags } = useTags()
const toast = useToast()

// Data State
const blogs = ref<BlogDto[]>([])
const categories = ref<CategoryDto[]>([])
const tags = ref<TagDto[]>([])

const page = ref(1)
const limit = 10
const totalItems = ref(0)
const pageCount = ref(10)

// Modal State
const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isEditMode = ref(false)
const selectedBlog = ref<BlogDto | null>(null)

// Form Schema
const schema = v.object({
  title: v.pipe(v.string(), v.nonEmpty('Title is required')),
  content: v.pipe(v.string(), v.nonEmpty('Content is required')),
  category_id: v.number('Category is required'),
  status: v.pipe(v.string(), v.nonEmpty('Status is required'),v.picklist(['DRAFT', 'PUBLISHED','ARCHIVED'])),
  excerpt: v.pipe(v.string(), v.nonEmpty('Excerpt is required')),
  thumbnail: v.optional(v.string()),
  tag_ids: v.optional(v.array(v.number()))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  id: undefined as number | undefined,
  title: '',
  content: '',
  category_id: undefined as number | undefined,
  status: 'DRAFT',
  excerpt: '',
  thumbnail: '',
  tag_ids: [] as number[]
})

// Columns
const columns: TableColumn<BlogDto>[] = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'category', header: 'Category' },
  { accessorKey: 'created_at', header: 'Created At' },
  { id: 'actions', header: 'Actions' }
]

// Methods
const fetchData = async () => {
  try {
     const res : any = await getBlogs(page.value, limit)
     if (res?.data) {
       blogs.value = res.data.items || []
       totalItems.value = res.data.meta?.total_items || 0
       pageCount.value = res.data.meta?.total_pages || 1
     } else if (Array.isArray(res)) {
        blogs.value = res
        totalItems.value = res.length
     }
  } catch (e) {
     toast.add({ title: 'Error', description: 'Failed to fetch blogs', color: 'error' })
  }
}

const fetchDependencies = async () => {
  try {
    const [catRes, tagRes] = await Promise.all([
      getCategories(1, 100), // Get reasonable amount
      getTags(1, 100)
    ])
    
    // Safety check for response structure
    if ((catRes as any)?.data?.items) {
      categories.value = (catRes as any).data.items
    } else if (Array.isArray(catRes)) { // Fallback if API returns array directly
      categories.value = catRes as any
    }

    if ((tagRes as any)?.data?.items) {
       tags.value = (tagRes as any).data.items
    } else if (Array.isArray(tagRes)) {
       tags.value = tagRes as any
    }

  } catch (e) {
    console.error('Failed to fetch dependencies', e)
  }
}

// Watch page change
watch(page, () => {
  fetchData()
})

// Lifecycle
onMounted(() => {
  fetchData()
  fetchDependencies()
})

const openCreateModal = () => {
  isEditMode.value = false
  selectedBlog.value = null
  resetForm()
  isModalOpen.value = true
}

const openEditModal = (blog: BlogDto) => {
  isEditMode.value = true
  selectedBlog.value = blog
  
  // Populate form
  state.id = blog.id
  state.title = blog.title
  state.content = blog.content
  state.category_id = blog.category?.id
  state.status = blog.status
  state.excerpt = blog.excerpt || ''
  state.thumbnail = blog.thumbnail || ''
  state.tag_ids = blog.tags ? blog.tags.map(t => t.id) : []

  isModalOpen.value = true
}

const confirmDelete = (blog: BlogDto) => {
  selectedBlog.value = blog
  isDeleteModalOpen.value = true
}

const resetForm = () => {
  state.id = undefined
  state.title = ''
  state.content = ''
  state.category_id = undefined
  state.status = 'DRAFT'
  state.excerpt = ''
  state.thumbnail = ''
  state.tag_ids = []
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    // Ensure category_id is present (Valibot handles validation, but strictly speaking)
    if (!state.category_id) {
       toast.add({ title: 'Error', description: 'Category is required', color: 'error' })
       return
    }

    const payload = {
        title: event.data.title,
        content: event.data.content,
        category_id: state.category_id, // Ensure using state value if not passed in event? Valibot should pass it.
        status: event.data.status,
        excerpt: event.data.excerpt,
        thumbnail: event.data.thumbnail,
        tag_ids: state.tag_ids // Use state for array
    }

    if (isEditMode.value && state.id) {
       await updateBlog(state.id, payload)
       toast.add({ title: 'Success', description: 'Blog updated successfully' })
    } else {
       await createBlog(payload as any) // Cast needed if optional fields mismatch specific interface structure strictness
       toast.add({ title: 'Success', description: 'Blog created successfully' })
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
  if (!selectedBlog.value) return
  
  try {
    await deleteBlog(selectedBlog.value.id)
    toast.add({ title: 'Success', description: 'Blog deleted successfully' })
    isDeleteModalOpen.value = false
    fetchData()
  } catch (e: any) {
    const msg = e.response?._data?.message || e.message || 'Failed to delete blog'
    toast.add({ title: 'Error', description: msg, color: 'error' })
  }
}

</script>
