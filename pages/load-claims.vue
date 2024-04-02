<template>
  <div class="text-4xl">LOGGING IN...</div>
  <pre>{{ JSON.stringify(currentProfileClaims,null,2) }}</pre>
</template>

<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const appStateStore = useAppStateStore()
  const currentProfileClaims = ref()

  const path = ref('/')

  const loadClaims = async () => {
    currentProfileClaims.value = await appStateStore.getCurrentProfileClaims(true)
    // if (data.session) {
    //   await appStateStore.setLoggedIn(true)
    //   const residentId = currentProfileClaims.residentId
    //   path.value = residentId ? '/' : '/my-profile'

    //   setTimeout(()=>{
    //     reloadNuxtApp({
    //       path: path.value,
    //       force: true
    //     })
    //   }, 1000)
    // } else {
    //   reloadNuxtApp({
    //     path: '/'
    //   })
    // }
  }
  loadClaims()
</script>
