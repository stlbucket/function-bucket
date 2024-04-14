<template>
  <UTabs
    :items="tabItems"
  >
    <template #activeSubscriptions="{ item }">
      <UCard>
        <div class="flex flex-col gap-2">
          <TenantSubscription
            v-if="activeSubscriptions.length > 0" 
            v-for="s in activeSubscriptions" 
            :subscription="s"
          />
          <div v-else class="flex grow justify-center">NO ACTIVE SUBSCRIPTIONS</div>
        </div>
      </UCard>  
    </template>

    <template #inactiveSubscriptions="{ item }">
      <UCard>
        <div class="flex flex-col gap-2">
          <TenantSubscription 
            v-if="inactiveSubscriptions.length > 0"
            v-for="s in inactiveSubscriptions" 
            :subscription="s"
          />
          <div v-else class="flex grow justify-center">NO INACTIVE SUBSCRIPTIONS</div>
        </div>
      </UCard>  
    </template>
  </UTabs>
</template>

<script lang="ts" setup>
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const tenantSubscriptions = ref([])

  const tabItems = ref([
    {
      slot: 'activeSubscriptions',
      label: 'Active Subscriptions',
    }, 
    {
      slot: 'inactiveSubscriptions',
      label: 'Inactive Subscriptions',
    }
  ])

  const loadData = async () => {
    // const result = await GqlTenantSubscriptions({
    //   tenantId: currentProfileClaims.value.tenantId
    // })
    // tenantSubscriptions.value = result.tenantSubscriptions.nodes.map((ats:any) => {
    //   return {
    //     ...ats,
    //     tenantName: ats.tenant.name
    //   }
    // })
  }
  loadData()

  const activeSubscriptions = computed(()=> {
    return tenantSubscriptions.value.filter((s:TenantSubscription) => String(s.status) === 'ACTIVE')
  })

  const inactiveSubscriptions = computed(()=> {
    return tenantSubscriptions.value.filter((s:TenantSubscription) => String(s.status) === 'INACTIVE')
  })
  </script>
