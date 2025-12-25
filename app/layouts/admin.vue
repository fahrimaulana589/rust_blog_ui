<template>
  <UDashboardGroup>
    <!-- SIDEBAR -->
    <UDashboardSidebar>
      <UNavigationMenu 
        :items="item_sidebars"
        orientation="vertical"
        tooltip
      />
    </UDashboardSidebar>

    <!-- MAIN -->
    <UDashboardPanel>
      <!-- NAVBAR -->
      <template #header>
        <UDashboardNavbar>
          <template #right>
            <UDropdownMenu :items="item_profiles">
              <UAvatar src="https://i.pravatar.cc/40" size="sm" />
            </UDropdownMenu>
          </template>
        </UDashboardNavbar>
      </template>

      <template #body>
        <div class="pb-24">
          <slot />
        </div>
      </template>
    </UDashboardPanel>

    <!-- LOGOUT MODAL -->
    <UModal title="Warning" v-model:open="isLogoutModalOpen" :dismissible="false">
        <template #body>
            <div class="h-48" >
                Are you sure you want to logout?
            </div>
        </template>
        <template #footer>
            <div class="flex gap-2 w-full justify-end">
                <UButton label="Cancel" color="neutral" variant="outline" @click="close" />
                <UButton label="Submit" color="neutral" @click="logout" />
            </div>
        </template>
    </UModal>
  </UDashboardGroup>
</template>

<script setup>
const isLogoutModalOpen = ref(false)
const logout = useAuth().logout
const close = () => {
    isLogoutModalOpen.value = false
}

const item_sidebars = ref([
  {
    label: 'Dashboard',
    icon: 'i-lucide-book-open',
    to: {name: 'admin'}
  },
  {
    label: 'Profile',
    icon: 'i-lucide-user',
    to: {name: 'admin-profile'}
  },
  {
    label: 'Project',
    icon: 'i-lucide-settings',
    open: true,
    children: [
      {
        label: 'All Projects',
        icon: 'i-lucide-folder-open',
        to: {name: 'admin-projects'}
      },
      {
        label: 'Stacks',
        icon: 'i-lucide-layers',
        to: {name: 'admin-stacks'}
      }
    ]
  },
])

const item_profiles = ref([
  [
    {
      label: 'Benjamin',
      avatar: {
        src: 'https://github.com/benjamincanac.png'
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onSelect: () => {
        isLogoutModalOpen.value = true
      }
    }
  ]
])
</script>
