<template>
  <UDashboardGroup>
    <!-- SIDEBAR -->
    <UDashboardSidebar>
      <UNavigationMenu 
        :items="item_sidebars"
        :collapsed="collapsed" 
        orientation="vertical"
        tooltip
      />
    </UDashboardSidebar>

    <!-- MAIN -->
    <UDashboardPanel class="flex flex-col">
      <!-- NAVBAR -->
      <UDashboardNavbar>
        <template #right>
          <UDropdownMenu :items="item_profiles">
            <UAvatar src="https://i.pravatar.cc/40" size="sm" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <!-- CONTENT -->
      <div class="flex-1 p-4">
        <slot />
      </div>
    </UDashboardPanel>

    <!-- LOGOUT MODAL -->
    <UModal title="Warning" v-model:open="isLogoutModalOpen" :dismissible="false">
        <template #body>
            <Placeholder class="h-48" >
                Are you sure you want to logout?
            </Placeholder>
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
  }
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
