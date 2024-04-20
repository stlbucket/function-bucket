<template>
  <div class="flex flex-col gap-3 grow">
    <div class="flex grow" v-for="t in todos">
      <div class="flex flex-col gap-1 grow">
        <div class="flex">
          <NuxtLink :to="`/tools/todo/${t.id}`">{{ t.name }}</NuxtLink>
        </div>
        <div class="flex justify-end">
          {{ t.status }}
        </div>
        <div class="flex justify-end">
          {{ t.resident.displayName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  todos: Todo[]
}>()
</script>
