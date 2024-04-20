<template>
  <UCard>
    <template #header>
      <div>APP TENANT SUBSCRIPTIONS</div>
      <div class="text-sm">Need to add a search stack here to bypass RLS</div>
    </template>
    <UTable
      :rows="tenantSubscriptions"
      :columns="[
        {key: 'licensePackKey', label: 'License Pack Key', sortable: true}
        ,{key: 'tenantName', label: 'App Tenant', sortable: true}
      ]"
      :sort="{ column: 'licensePackKey', direction: 'asc' }"
    >
      <template #tenantName-data="{row}">
        {{ row.tenant.name }}
      </template>
    </UTable>
  </UCard>  
</template>

<script lang="ts" setup>
  const tenantSubscriptions = ref([])
  const loadData = async () => {
    const result = await GqlAllTenantSubscriptions()
    tenantSubscriptions.value = result.allTenantSubscriptions.nodes
  }
  loadData()
</script>
