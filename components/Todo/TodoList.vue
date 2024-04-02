<template>
    <UTable
      :rows="todos"
      :columns="[
        { key:'name', label: 'Name' },
        { key:'status', label: 'Status' },
        { key:'assigned-to', label: 'Assigned To'}
      ]"
      class="grow"
    >
    <template #name-data="{row}">
        <NuxtLink :to="`/tools/todo/${row.id}`">{{ row.name }}</NuxtLink>
      </template>
      <template #assigned-to-data="{row}">
        {{ row.resident.displayName }}
      </template>
    </UTable>
</template>

<script lang="ts" setup>
const props = defineProps<{
  todos: Todo[]
}>()
</script>
