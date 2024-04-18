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
  const currentProfileClaimsQuery = useCurrentProfileClaimsQuery()
  const load = async () => {
    const { data } = await currentProfileClaimsQuery.executeQuery()
    appStateStore.storeAppUserClaims(data.value?.currentProfileClaims)
  }
  load()
</script>

