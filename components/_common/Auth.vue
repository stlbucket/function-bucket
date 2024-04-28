<template>
  <div v-if="currentProfileClaims" class="flex grow items-center justify-around gap-2">
    <!-- <ChangeResidencyModal /> -->
    <div :class="`flex gap-1 p-1 bg-gray-800 hover:bg-gray-600 ${tenantNameBounce ? 'animate-bounce bg-gray-800' : ''}`">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M21.25 8.5c0-1.404 0-2.107-.337-2.611a2 2 0 0 0-.552-.552c-.441-.295-1.034-.332-2.115-.336c.004.291.004.596.004.91V7.25h1a.75.75 0 0 1 0 1.5h-1v1.5h1a.75.75 0 0 1 0 1.5h-1v1.5h1a.75.75 0 0 1 0 1.5h-1v6.5h-1.5V6c0-1.886 0-2.828-.586-3.414C15.578 2 14.636 2 12.75 2h-2c-1.886 0-2.828 0-3.414.586C6.75 3.172 6.75 4.114 6.75 6v15.25h-1.5v-6.5h-1a.75.75 0 0 1 0-1.5h1v-1.5h-1a.75.75 0 0 1 0-1.5h1v-1.5h-1a.75.75 0 0 1 0-1.5h1V5.91c0-.313 0-.618.004-.91c-1.081.005-1.674.042-2.115.337a2 2 0 0 0-.552.552C2.25 6.393 2.25 7.096 2.25 8.5v12.75h-.5a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5h-.5zM9 11.75a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m2.75 3.5a.75.75 0 0 1 .75.75v2.25H11V19a.75.75 0 0 1 .75-.75M9 6.25a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 9 6.25m0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 9 9.25" clip-rule="evenodd"/></svg>
      <div :class="`hidden md:flex text-sm`">{{ currentProfileClaims.tenantName }}</div>
    </div>
    <div v-if="currentProfileClaims.displayName === 'Site Support'"><UButton color="yellow" @click="exitSupportMode">Exit Support Mode</UButton></div>
    <NuxtLink to="/my-profile" v-if="currentProfileClaims.displayName">
      <div class="flex gap-1 p-1 bg-gray-800 hover:bg-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.964 0a9 9 0 1 0-11.963 0m11.962 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path></svg>
        <div>{{ currentProfileClaims.displayName }}</div>
      </div>
    </NuxtLink>
    <div v-if="currentProfileClaims.displayName">
      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 2h-1c-2.829 0-4.242 0-5.121.879C9 3.758 9 5.172 9 8v8c0 2.829 0 4.243.879 5.122c.878.878 2.292.878 5.119.878H16c2.828 0 4.242 0 5.121-.879C22 20.243 22 18.828 22 16V8c0-2.828 0-4.243-.879-5.121C20.242 2 18.828 2 16 2" opacity=".5"/><path fill="currentColor" fill-rule="evenodd" d="M15.75 12a.75.75 0 0 0-.75-.75H4.027l1.961-1.68a.75.75 0 1 0-.976-1.14l-3.5 3a.75.75 0 0 0 0 1.14l3.5 3a.75.75 0 1 0 .976-1.14l-1.96-1.68H15a.75.75 0 0 0 .75-.75" clip-rule="evenodd"/></svg>    -->
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
    await refreshAvailableModules()
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
