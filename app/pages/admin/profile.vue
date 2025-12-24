<template>
  <NuxtLayout name="admin">
    <UBreadcrumb :items="items" />
    <h1 class="text-2xl font-bold my-4">Admin Profile</h1>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  name: 'admin-profile'
})

useHead({
  title: 'Admin Profile'
})

const items = ref([
  {
    label: 'Dashboard',
    icon: 'i-lucide-book-open',
    to: {name: 'admin'}
  },
  {
    label: 'Profile',
    icon: 'i-lucide-box',
    to: {name: 'admin-profile'}
  }
])

const { get_profile, loading } = useProfile()

const toast = useToast()

const profile = reactive({
  
})

onMounted(async () => {
  try {
    const data = await get_profile()
    if(data) {
      
    }else{
      navigateTo({name: 'admin-login'})
    }
  } catch (err) {
    toast.add({ title: 'Error', description: 'An error occurred during get profile', color: 'error' })
  }
})

</script>

<style>

</style>