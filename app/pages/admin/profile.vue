<template>
  <NuxtLayout name="admin">
    <UBreadcrumb :items="items" />
    <h1 class="text-2xl font-bold">Admin Profile</h1>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Full Name" name="full_name">
        <UInput v-model="state.full_name" class="w-full" placeholder="Enter your full name" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Headline" name="headline">
        <UInput v-model="state.headline" class="w-full" placeholder="Enter your headline" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Summary" name="summary">
        <UInput v-model="state.summary" class="w-full" placeholder="Enter your summary" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Role" name="role">
        <UInput v-model="state.role" class="w-full" placeholder="Enter your role" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Location" name="location">
        <UInput v-model="state.location" class="w-full" placeholder="Enter your location" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Profile Image" name="profile_image">
        <UInput v-model="state.profile_image" class="w-full" placeholder="Enter your profile image" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Availability" name="availability">
        <UInput v-model="state.availability" class="w-full" placeholder="Enter your availability" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Years of Experience" name="years_of_experience">
        <UInput v-model="state.years_of_experience" type="number" class="w-full" placeholder="Enter your years of experience" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Resume URL" name="resume_url">
        <UInput v-model="state.resume_url" class="w-full" placeholder="Enter your resume url" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Email" name="email">
        <UInput v-model="state.email" class="w-full" placeholder="Enter your email" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Work Philosophy" name="work_philosophy">
        <UInput v-model="state.work_philosophy" class="w-full" placeholder="Enter your work philosophy" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Timezone" name="timezone">
        <UInput v-model="state.timezone" class="w-full" placeholder="Enter your timezone" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Specializations" name="specializations">
        <UInputTags v-model="state.specializations" class="w-full" placeholder="Enter your specializations" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Tech Focus" name="tech_focus">
        <UInputTags v-model="state.tech_focus" class="w-full" placeholder="Enter your tech focus" icon="i-heroicons-user" />
      </UFormField>

      <UFormField label="Languages" name="languages" help="Format: Language : Level (e.g. English : Native)">
        <UInputTags v-model="state.languages" class="w-full" placeholder="Enter languages (e.g. English : Native)" icon="i-heroicons-user" />
      </UFormField>

      <UButton type="submit" block class="w-full" :loading="loading">
        Update Profile
      </UButton>
    </UForm>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

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

const { get_profile, loading, update_profile } = useProfile()

const toast = useToast()

const state = reactive({
  full_name: '',
  headline: '',
  summary: '',
  role: '',
  location: '',
  profile_image: '',
  availability: '',
  years_of_experience: 0,
  resume_url: '',
  email: '',
  work_philosophy: '',
  timezone: '',
  specializations: [] as string[],
  tech_focus: [] as string[],
  languages: [] as string[]
})

onMounted(async () => {
  try {
    const res = await get_profile()
    if(res) {
      state.full_name = res.data.full_name
      state.headline = res.data.headline
      state.summary = res.data.summary
      state.role = res.data.role
      state.location = res.data.location
      state.profile_image = res.data.profile_image
      state.availability = res.data.availability
      state.years_of_experience = res.data.years_of_experience
      state.resume_url = res.data.resume_url
      state.email = res.data.email
      state.work_philosophy = res.data.work_philosophy
      state.timezone = res.data.timezone
      state.specializations = res.data.specializations
      state.tech_focus = res.data.tech_focus
      console.log(res.data.languages)
      state.languages = res.data.languages.map((language) => {
        return language.name+" : "+language.level
      })
    }

  } catch (err) {
    toast.add({ title: 'Error', description: 'An error occurred during get profile', color: 'error' })
  }
})

const schema = v.object({
  full_name: v.pipe(v.string(), v.nonEmpty('Full name is required')),
  headline: v.pipe(v.string(), v.nonEmpty('Headline is required')),
  summary: v.pipe(v.string(), v.nonEmpty('Summary is required')),
  role: v.pipe(v.string(), v.nonEmpty('Role is required')),
  location: v.pipe(v.string(), v.nonEmpty('Location is required')),
  profile_image: v.pipe(v.string(), v.nonEmpty('Profile image is required')),
  availability: v.pipe(v.string(), v.nonEmpty('Availability is required')),
  years_of_experience: v.number(),
  resume_url: v.pipe(v.string(), v.nonEmpty('Resume url is required')),
  email: v.pipe(v.string(), v.nonEmpty('Email is required')),
  work_philosophy: v.pipe(v.string(), v.nonEmpty('Work philosophy is required')),
  timezone: v.pipe(v.string(), v.nonEmpty('Timezone is required')),
  specializations: v.array(v.string()),
  tech_focus: v.array(v.string()),
  languages: v.array(v.string())
})

type Schema = v.InferOutput<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const defaultData = {
      ...event.data,
      languages: event.data.languages.map((lang) => {
        const parts = lang.split(/\s*[:]\s*/) // Split by colon with optional whitespace
        const name = parts[0]
        const level = (parts.length > 1 && parts[1]) ? parts[1] : 'Basic' // Default to Basic if no level provided
        return { name: name || lang, level: level }
      })
    }

    const success = await update_profile(defaultData)
    
    if (success) {
      toast.add({ title: 'Success', description: 'Profile updated successfully' })
    } else {
      toast.add({ title: 'Error', description: 'An error occurred during update profile', color: 'error' })
    }
  } catch (error) {
    toast.add({ title: 'Error', description: 'An error occurred during update profile', color: 'error' })
  }
}

</script>

<style>

</style>