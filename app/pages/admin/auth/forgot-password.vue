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
        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" placeholder="Enter your email" icon="i-heroicons-envelope" />
        </UFormField>

        <div class="text-sm">
            <NuxtLink :to="{name: 'admin-login'}" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Have an account?
            </NuxtLink>
        </div>

        <UButton type="submit" block class="w-full">
          Submit
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>


<script lang="ts" setup>
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const { forgotPassword } = useAuth()
const toast = useToast()

definePageMeta({
  name: 'admin-forgot-password'
})

useHead({
  title: 'Forgot Password'
})

const state = reactive({
  email: '',
})

const schema = v.object({
  email: v.pipe(v.string(),v.nonEmpty('Email is required'),v.email('Invalid email')),
})

type Schema = v.InferOutput<typeof schema>

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
    try {
        const success = await forgotPassword(event.data.email)
        if (success) {
            toast.add({ title: 'Success', description: success })
            navigateTo({name: 'admin-reset-password' })
        } else {
            toast.add({ title: 'Error', description: 'Failed to send reset password instructions', color: 'error' })
        }
    } catch (error) {
        toast.add({ title: 'Error', description: 'An error occurred during forgot password', color: 'error' })
    }
} 
</script>