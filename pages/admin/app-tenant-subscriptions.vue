<template>
  <ClientOnly>
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
  </ClientOnly>
</template>

<script lang="ts" setup>
  const store = useAppStateStore()
  const currentProfileClaims = await useCurrentProfileClaims()
  const { data } = await useTenantSubscriptionsQuery({
    variables: {
      tenantId: currentProfileClaims.value?.tenantId
    }
  })
  const tenantSubscriptions = ref((data.value?.tenantSubscriptions || []) as unknown as TenantSubscription[])

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

  const activeSubscriptions = computed(()=> {
    return tenantSubscriptions.value.filter((s:TenantSubscription) => String(s.status) === 'ACTIVE')
  })

  const inactiveSubscriptions = computed(()=> {
    return tenantSubscriptions.value.filter((s:TenantSubscription) => String(s.status) === 'INACTIVE')
  })
  </script>
