<template>
  <div class="flex flex-col">
    <MyWorkspaces />
  </div>
</template>

<script setup lang="ts">
  const currentProfileClaims = await useCurrentProfileClaims()
  await refreshCurrentProfileClaims()
</script>