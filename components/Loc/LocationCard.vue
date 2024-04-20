<template>
  <UCard>
    <div>{{ location.name }}</div>
    <div>{{ location.address1 }}</div>
    <div>{{ `${location.city}, ${location.state} ${location.postalCode}` }}</div>
  </UCard>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    location: LocationInfo
  }>()
</script>