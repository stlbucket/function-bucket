<template>
  <ClientOnly>
    <div class="flex justify-between">
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
                :rows="homeResidency"
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
        </div>
      </UCard>
      <UCard>
        <template #header>
          ALL USER DATA (from auth provider)
        </template>
        <pre>{{ siteUser }}</pre>
      </UCard>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const {
    data,
    executeQuery
  } = await useSiteUserByIdQuery({
    variables: {
      id: route.params.id
    }
  })
  // console.log(data.value)
  const siteUser = ref(data.value?.siteUserById)

  const activeResidency = computed(() => siteUser.value.residencies.filter((r: Resident) => String(r.status) === 'active'))
  const homeResidency = computed(() => siteUser.value.residencies.filter((r: Resident) => String(r.type) === 'home'))
  const inactiveResidencies = computed(() => siteUser.value.residencies.filter((r: Resident) => String(r.status) !== 'active' && String(r.type) !== 'support'))
  const supportResidencies = computed(() => siteUser.value.residencies.filter((r: Resident) => String(r.type) === 'support'))
</script>