<script setup lang="ts">
  const { currentProfileClaims } = storeToRefs(useAppStateStore())

watch(currentProfileClaims.value, () => {
  if (currentProfileClaims.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>
<template>
  <div>Waiting for login...</div>
</template>
