<template>
  <div class="flex flex-col">
    <div class="flex flex-col">
      <UCard v-for="p in profiles" >
        <NuxtLink :to="`/site-admin/site-users/${p.id}`">{{ p.email }}</NuxtLink>
        <div>{{ p.firstName }} {{ p.lastName }}</div>
        <div>{{ p.status }}</div>
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    profiles: any[]
  }>()
</script>
