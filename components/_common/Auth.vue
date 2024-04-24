<template>
  <!-- <div v-if="!supUser" class="flex">
    <UInput placeholder="Your Email address" v-model="email" data-1p-ignore></UInput>
    <UButton @click="handleLogin">Send Magic Link</UButton>
  </div> -->
  <div v-if="currentProfileClaims" class="flex grow items-center justify-around gap-2">
    <div class="hidden md:flex text-sm">{{ currentProfileClaims.tenantName }}</div>
    <div v-if="showExitSupportMode"><UButton color="yellow" @click="exitSupportMode">Exit Support Mode</UButton></div>
    <NuxtLink to="/my-profile">
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.964 0a9 9 0 1 0-11.963 0m11.962 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path></svg>
    </NuxtLink>
    <!-- <div class="flex gap-1 items-center">
      <div class="text-lg">
        <NuxtLink to="/my-profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.964 0a9 9 0 1 0-11.963 0m11.962 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path></svg>
          <div>{{ currentProfileClaims.displayName }}</div>
        </NuxtLink>
      </div>
    </div> -->
    <div>
      <UButton
        @click="handleLogout"
        icon="i-heroicons-arrow-left-on-rectangle"
        size="xs"
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
  
  const {data, error} = await useCurrentProfileClaimsQuery()
  const currentProfileClaims = ref(data.value?.currentProfileClaims)

  const handleLogout = async () => {
    navigateTo('/logout')
  }
  const showExitSupportMode = computed(() => {
    return (currentProfileClaims.value?.residentId !== currentProfileClaims.value?.actualResidentId) && currentProfileClaims.value.displayName === 'Site Support'
  })
  
  const exitSupportModeMutation = await useExitSupportModeMutation()
  const exitSupportMode = async () => {
    const { data, error } = await exitSupportModeMutation.executeMutation({})
    if (error) alert(error.toString())
    await supabase.auth.refreshSession()
    await appStateStore.getCurrentProfileClaims(true)
    reloadNuxtApp({
      path: '/site-admin/tenant',
      force: true
    })    
  }
  const loggedIn = computed(() => {
    return appStateStore.loggedIn
  })
</script>
