<template>
  <UTable
    :rows="profiles"
    :columns="[
      {key: 'email', label: 'Email', sortable: true},
      {key: 'firstName', label: 'First Name', sortable: true},
      {key: 'lastName', label: 'Last Name', sortable: true},
      {key: 'status', label: 'Status', sortable: true},
    ]"
    :sort="{ column: 'name', direction: 'asc' }"
    class="grow"
  >
    <template #email-data="{ row }">
      <NuxtLink :to="`/site-admin/site-users/${row.id}`">{{ row.email }}</NuxtLink>
    </template>
  </UTable>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    profiles: any[]
  }>()
</script>
