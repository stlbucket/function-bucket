<script setup lang="ts">
  const currentProfileClaims = await useCurrentProfileClaims()

watch(currentProfileClaims.value, () => {
  if (currentProfileClaims.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>
<template>
  <div>Waiting for login...</div>
</template>
