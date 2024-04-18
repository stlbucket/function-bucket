<template>
  <UCard>
    <template #header>
      <div>LICENSES</div>
    </template>
      <UTable
        :rows="licenses"
        :columns="[
          {key: 'licenseTypeKey', label: 'License Type Key', sortable: true},
          {key: 'email', label: 'Email', sortable: true},
          {key: 'status', label: 'Status', sortable: true},
        ]"
        :sort="{ column: 'tenantName', direction: 'asc' }"
      >
      </UTable>
  </UCard>
</template>

<script lang="ts" setup>
  const licenses: Ref<any[]> = ref([])
  const licensesQuery = useTenantLicensesQuery()

  const loadData = async () => {
    const user = await useSupabaseClient().auth.getUser()
    const { data } = await licensesQuery.executeQuery({
      tenantId: user.data.user?.user_metadata.app_tenant_id
    })
    licenses.value = (data.value?.tenantLicenses?.nodes || []).map(l => {
      return {
        ...l,
        status: l.residency.status,
        email: l.residency.email
      }
    })
  }
  loadData()
</script>
