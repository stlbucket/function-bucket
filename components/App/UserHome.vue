<template>
  <div class="flex flex-col">
    <MyResidents />
  </div>
</template>

<script setup lang="ts">
  const currentProfileClaims = await useCurrentProfileClaims()
  await refreshCurrentProfileClaims()
</script>