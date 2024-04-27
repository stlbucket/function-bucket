<template>
  <div class="text-4xl">LOGGING IN...</div>
  <!-- <pre>{{ JSON.stringify(session,null,2) }}</pre> -->
</template>

<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const appStateStore = useAppStateStore()
  const session = ref()

  const path = ref('/')

  const loadUser = async () => {
    const { data, error } = await supabase.auth.getSession()
    session.value = data.session
    if (data.session) {
      await appStateStore.setLoggedIn(true)
      // const currentProfileClaims = await appStateStore.getCurrentProfileClaims(true)
      // const residentId = currentProfileClaims.residentId
      path.value = '/load-claims'

      setTimeout(()=>{
        reloadNuxtApp({
          path: path.value,
          force: true
        })
      }, 1000)
    } else {
      reloadNuxtApp({
        path: '/'
      })
    }
  }
  loadUser()
</script>
