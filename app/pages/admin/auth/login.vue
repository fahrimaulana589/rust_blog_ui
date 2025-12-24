<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = v.object({
  username: v.pipe(v.string()),
  password: v.pipe(v.string())
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  username: '',
  password: ''
})

const { login, loading } = useAuth()
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const success = await login(event.data.username, event.data.password)
    if (success) {
      toast.add({ title: 'Success', description: 'Logged in successfully' })
      await navigateTo('/admin')
    } else {
      toast.add({ title: 'Error', description: 'Invalid credentials', color: 'error' })
    }
  } catch (error) {
    toast.add({ title: 'Error', description: 'An error occurred during login', color: 'error' })
  }
}

useHead({
  title: 'Admin Login'
})

definePageMeta({
    middleware: 'guest',
    name: 'admin-login'
})

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <UCard class="w-full max-w-sm">
      <template #header>
        <div class="text-center">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
          <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">Sign in to your account</p>
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Username" name="username">
          <UInput v-model="state.username" class="w-full" placeholder="Enter your username" icon="i-heroicons-user" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="state.password" class="w-full" type="password" placeholder="Enter your password" icon="i-heroicons-lock-closed" />
        </UFormField>

        <div class="text-sm">
            <NuxtLink to="/admin/forgot-password" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Forgot password?
            </NuxtLink>
        </div>

        <UButton type="submit" block class="w-full" :loading="loading">
          Sign in
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
