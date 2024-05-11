<template>
  <div v-if="currentProfileClaims" class="flex grow items-center justify-around gap-2">
    <div class="flex flex-col gap-1">
      <div :class="` flex grow p-1 dark:bg-gray-800 hover:bg-gray-600 ${tenantNameBounce ? 'animate-ping bg-gray-800' : ''}`">
        {{ currentProfileClaims.tenantName }}
      </div>
      <div v-if="showExitSupport"><UButton color="yellow" @click="exitSupportMode">Exit Support Mode</UButton></div>
    </div>
    <NuxtLink to="/my-profile" v-if="currentProfileClaims.displayName">
      <div class="flex gap-1 p-1 dark:bg-gray-800">
        <UIcon name="solar:user-bold" class="w-6 h-6 hover:text-blue-600" />
        <div class="max-sm:hidden">{{ currentProfileClaims.displayName }}</div>
      </div>
    </NuxtLink>
    <div v-if="currentProfileClaims.displayName">
      <UButton
        @click="handleLogout"
        icon="i-heroicons-arrow-left-on-rectangle"
        color="white"
        square
        variant="solid" 
        title="Logout"
      ></UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const appStateStore = useAppStateStore()
  const supabase = useSupabaseClient()
  const currentProfileClaims: Ref<any> = await useCurrentProfileClaims()
  const tenantNameBounce = ref(false);

  const handleLogout = async () => {
    navigateTo('/logout')
  }  
  const exitSupportModeMutation = await useExitSupportModeMutation()
  const exitSupportMode = async () => {
    const { data, error } = await exitSupportModeMutation.executeMutation({})
    if (error) alert(error.toString())
    await supabase.auth.refreshSession()
    await refreshCurrentProfileClaims()
    // await refreshAvailableModules()
    navigateTo('/site-admin/tenant')
  }
  const showExitSupport = computed(() => {
    return currentProfileClaims.value.displayName === 'Site Support'
  })
  watch (() => currentProfileClaims.value.tenantName, () => {
    tenantNameBounce.value = true
    setTimeout(() => { tenantNameBounce.value = false }, 1469)
  })
</script>
