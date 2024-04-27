<template>logging out...</template>

<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const appStateStore = useAppStateStore()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      alert(error.message)
    }
    appStateStore.setLoggedIn(false)
    await refreshCurrentProfileClaims()
    await refreshAvailableModules()
    navigateTo('/')
    // reloadNuxtApp({
    //   path: '/',
    //   force: true
    // })
  }
  handleLogout()
</script>