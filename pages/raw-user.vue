<template>
  <pre>{{ currentProfileClaims }}</pre>
</template>

<script lang="ts" setup>
  const currentProfileClaims = await useCurrentProfileClaims()
</script>