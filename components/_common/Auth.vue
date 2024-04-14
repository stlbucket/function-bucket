<template>
  <!-- <div v-if="!supUser" class="flex">
    <UInput placeholder="Your Email address" v-model="email" data-1p-ignore></UInput>
    <UButton @click="handleLogin">Send Magic Link</UButton>
  </div> -->
  <div v-if="currentProfileClaims" class="flex grow items-center justify-around gap-20">
    <div class="hidden md:flex text-sm">{{ currentProfileClaims.tenantName }}</div>
    <div v-if="showExitSupportMode"><UButton color="yellow" @click="exitSupportMode">Exit Support Mode</UButton></div>
    <div class="text-xs"><NuxtLink to="/my-profile">{{ currentProfileClaims.displayName }}</NuxtLink></div>
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
  // const route = useRoute();
  
  const appStateStore = useAppStateStore()
  const currentProfileClaims = ref()
  const supabase = useSupabaseClient()

  const loadUser = async () => {
    try{
      const {data, error} = await useCurrentProfileClaimsQuery()
      console.log(JSON.stringify(data.value))
      currentProfileClaims.value = data.value?.currentProfileClaims
    } catch (e) {
      console.log('ERROR', e)
    }
  }
  loadUser()

  const handleLogout = async () => {
    navigateTo('/logout')
  }
  const showExitSupportMode = computed(() => {
    return (currentProfileClaims.value?.residentId !== currentProfileClaims.value?.actualResidentId) && currentProfileClaims.value.displayName === 'Site Support'
  })
  const exitSupportMode = async () => {
    const { data, error } = await useExitSupportModeMutation()
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