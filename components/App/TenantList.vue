<template>
  <UTable
    :rows="tenants"
    :columns="[
      {key: 'action'},
      {key: 'name', label: 'Name', sortable: true},
      {key: 'status', label: 'Status', sortable: true},
      {key: 'type', label: 'Type', sortable: true},
      {key: 'identifier', label: 'Identifier', sortable: true},
      {key: 'subscriptions', label: 'Subscriptions', sortable: false},
    ]"
    :sort="{ column: 'name', direction: 'asc' }"
    class="grow"
  >
    <template #name-data="{ row }">
      <NuxtLink :to="`/site-admin/tenant/${row.id}`">{{ row.name }}</NuxtLink>
    </template>
    <template #action-data="{ row }">
      <UButton @click="onSupport(row)">Support</UButton>
    </template>
    <template #subscriptions-data="{ row }">
      <UBadge v-for="s in row.subscriptions">{{ s.licensePackKey }}</UBadge>
    </template>
  </UTable>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    tenants: Tenant[]
  }>()
  const emit = defineEmits<{
    (e: 'support', tenant: Tenant): void
  }>()

  const onSupport = async (tenant: Tenant) => {
    emit('support', tenant)
  }
</script>
