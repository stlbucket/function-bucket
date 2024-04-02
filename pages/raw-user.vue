<template>
  <pre>{{ JSON.stringify(currentProfileClaims,null,2) }}</pre>
</template>

<script lang="ts" setup>
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
</script>