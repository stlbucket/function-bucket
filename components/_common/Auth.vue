<template>
  <div v-if="currentProfileClaims" class="flex grow items-center justify-around gap-2">
    <MyResidents compact />
    <div v-if="currentProfileClaims.displayName === 'Site Support'"><UButton color="yellow" @click="exitSupportMode">Exit Support Mode</UButton></div>
    <NuxtLink to="/my-profile" v-if="currentProfileClaims.displayName">
      <div class="flex gap-1 p-1 bg-gray-800 hover:bg-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.964 0a9 9 0 1 0-11.963 0m11.962 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path></svg>
        <div>{{ currentProfileClaims.displayName }}</div>
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
  const loggedIn = computed(() => {
    return appStateStore.loggedIn;
  })
  watch (() => currentProfileClaims.value.tenantName, () => {
    tenantNameBounce.value = true
    setTimeout(() => { tenantNameBounce.value = false }, 1469)
  })
</script>
