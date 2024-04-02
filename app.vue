<template>
  <UContainer
    :ui="{
      base: 'mx-auto'
    }"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UContainer>
  <UNotifications />
</template>

<script lang="ts" setup>
  const appStateStore = useAppStateStore()
  const load = async () => {
    await appStateStore.getCurrentProfileClaims()
  }
  load()
</script>

