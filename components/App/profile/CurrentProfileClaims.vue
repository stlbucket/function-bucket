<template>
  <UCard>
    <template #header>
      CURRENT PROFILE CLAIMS
    </template>
    <pre class="text-xs">{{ currentProfileClaims }}</pre>
  </UCard>
</template>

<script setup lang="ts">
  const currentProfileClaims = await useCurrentProfileClaims()
</script>