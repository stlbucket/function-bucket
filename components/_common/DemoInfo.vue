<template>
  <div class="flex justify-between bg-red-600 p-2 rounded grow">
    <p>This is a prototype instance - all data is subject to removal at any time.</p>
    <a class="text-blue-900 underline" v-if="isDemoMode" href="http://localhost:54324/monitor">Inbucket Monitor</a>
  </div>
</template>

<script lang="ts" setup>
const isDemoMode = computed(() => {
  return useRuntimeConfig().public.DEMO_MODE
})
</script>
