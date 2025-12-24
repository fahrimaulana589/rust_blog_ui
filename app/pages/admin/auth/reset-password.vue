<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <UCard class="w-full max-w-sm">
      <template #header>
        <div class="text-center">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">Admin Reset Password</h1>
          <p class="mt-1 text-gray-500 dark:text-gray-400 text-sm">Enter your new password</p>
        </div>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Token" name="token">
          <UInput v-model="state.token" class="w-full" placeholder="Enter reset token" icon="i-heroicons-key" />
        </UFormField>

        <UFormField label="New Password" name="new_password">
          <UInput v-model="state.new_password" class="w-full" type="password" placeholder="Enter new password" icon="i-heroicons-lock-closed" />
        </UFormField>

        <UFormField label="Confirm Password" name="confirm_password">
          <UInput v-model="state.confirm_password" class="w-full" type="password" placeholder="Confirm new password" icon="i-heroicons-lock-closed" />
        </UFormField>

        <div class="text-sm">
            <NuxtLink :to="{name: 'admin-login'}" class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                Back to Login
            </NuxtLink>
        </div>

        <UButton type="submit" block class="w-full" :loading="loading">
          Reset Password
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const { resetPassword, loading } = useAuth()
const toast = useToast()

const state = reactive({
  token: '',
  new_password: '',
  confirm_password: ''
})

const schema = v.pipe(
  v.object({
    token: v.pipe(v.string(), v.nonEmpty('Token is required')),
    new_password: v.pipe(v.string(), v.nonEmpty('New password is required')),
    confirm_password: v.pipe(v.string(), v.nonEmpty('Confirm password is required')),
  }),
  v.forward(
    v.check((input) => input.new_password === input.confirm_password, 'Passwords do not match'),
    ['confirm_password']
  )
)

type Schema = v.InferOutput<typeof schema>

definePageMeta({
  name: 'admin-reset-password'
})

useHead({
  title: 'Admin Reset Password'
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const success = await resetPassword(event.data.token, event.data.new_password)
    if (success) {
      toast.add({ title: 'Success', description: 'Password reset successfully' })
      await navigateTo({name: 'admin-login'})
    } else {
      toast.add({ title: 'Error', description: 'Failed to reset password', color: 'error' })
    }
  } catch (error) {
    toast.add({ title: 'Error', description: 'An error occurred during password reset', color: 'error' })
  }
}
</script>