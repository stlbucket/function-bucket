<template>
  <UCard v-if="siteUser">
    <template #header>
    </template>
    <div class="flex justify-start flex-wrap md:flex-no-wrap md:justify-between">
      <div class="flex flex-col">
        <UCard>
          <template #header>
            Active Residency
          </template>
          <UTable
            :rows="activeResidency"
            :columns="[
              {key:'tenant_name', label: 'Tenant'},
              {key:'display_name', label: 'Display Name'},
              {key:'status', label: 'Status'}
            ]"
          >
          </UTable>
        </UCard>
        <UCard>
          <template #header>
            Home Residency
          </template>
          <UTable
            :rows="activeResidency"
            :columns="[
              {key:'tenant_name', label: 'Tenant'},
              {key:'display_name', label: 'Display Name'},
              {key:'status', label: 'Status'}
            ]"
          >
          </UTable>
        </UCard>
        <UCard>
          <template #header>
            Inactive Residencies
          </template>
          <UTable
            :rows="inactiveResidencies"
            :columns="[
              {key:'tenant_name', label: 'Tenant'},
              {key:'display_name', label: 'Display Name'},
              {key:'status', label: 'Status'}
            ]"
          >
          </UTable>
        </UCard>
        <UCard>
          <template #header>
            Support Residencies
          </template>
          <UTable
            :rows="supportResidencies"
            :columns="[
              {key:'tenant_name', label: 'Tenant'},
              {key:'display_name', label: 'Display Name'},
              {key:'status', label: 'Status'}
            ]"
          >
          </UTable>
        </UCard>
      </div>
      <div class="flex flex-col items-stretch">
        <UCard>
          <template #header>
            RAW USER META DATA (user claims)
          </template>
          <pre class="flex">{{ JSON.stringify(siteUser.raw_user_meta_data,null,2) }}</pre>
        </UCard>
      </div>
    </div>
  </UCard>
  <UCard>
    <template #header>
      ALL USER DATA (from auth provider)
    </template>
    <pre class="flex">{{ JSON.stringify(siteUser,null,2) }}</pre>
  </UCard>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const siteUser = ref()
  const activeResidency = ref([])
  const homeResidency = ref([])
  const inactiveResidencies = ref([])
  const supportResidencies = ref([])
  
  const loadData = async () => {
    const result = await GqlSiteUserById({
      id: route.params.id,
    })
    siteUser.value = result.siteUserById.authUser
    activeResidency.value = result.siteUserById.residencies.filter((r: Resident) => String(r.status) === 'active')
    homeResidency.value = result.siteUserById.residencies.filter((r: Resident) => String(r.type) === 'home')
    inactiveResidencies.value = result.siteUserById.residencies.filter((r: Resident) => String(r.status) !== 'active' && String(r.type) !== 'support')
    supportResidencies.value = result.siteUserById.residencies.filter((r: Resident) => String(r.type) === 'support')
  }
  loadData()  

</script>