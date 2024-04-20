<template>
  <ClientOnly>    
    <UCard v-if="tenant">
      <template #header>
        <div class="flex justify-between">
          <div class="text-3xl">{{ tenant.name }}</div>
          <div class="flex gap-2">
            <UButton v-if="tenant.status === 'ACTIVE'" @click="onDeactivateTenant" color="red">Deactivate</UButton>
            <UButton v-if="tenant.status === 'INACTIVE'" @click="onActivateTenant" color="yellow">Activate</UButton>
          </div>
        </div>
      </template>
      <div class="flex justify-start gap-5">
        <div class="flex flex-col gap-1 bg-cyan-700 p-3">
          <div class="flex text-xs">Status</div>
          <div class="flex">{{ tenant.status }}</div>
        </div>
        <div class="flex flex-col gap-1 bg-cyan-700 p-3">
          <div class="flex text-xs">Type</div>
          <div class="flex">{{ tenant.type }}</div>
        </div>
        <div class="flex flex-col gap-1 bg-cyan-700 p-3">
          <div class="flex text-xs"># Residents</div>
          <div class="flex">{{ tenant.residents.totalCount }}</div>
        </div>
      </div>
      <UCard>
        <template #header>
          <div class="flex justify-between">
            <div>ACTIVE SUBSCRIPTIONS</div>
            <TenantSubscribeToLicensePackModal :tenant="tenant" @subscribe="onSubscribe"/>
          </div>
        </template>
        <UTable
          :rows="tenant.tenantSubscriptions.filter((s:TenantSubscription) => String(s.status) === 'ACTIVE')"
          :columns="[
            {key: 'licensePackKey', label: 'Key'},
            {key: 'licenseCount', label: '# Licenses'},
            {key: 'status', label: 'Status'}
          ]"
        >
          <template #licenseCount-data="{row}">
            {{ row.licenses.totalCount }}
          </template>
          <template #status-data="{row}">
            <UButton v-if="row.status === 'ACTIVE'" @click="onDeactivateSubscription(row.id)" color="red">Deactivate</UButton>
            <UButton v-if="row.status === 'INACTIVE'" @click="onReactivateSubscription(row.id)">Reactivate</UButton>
          </template>
        </UTable>
      </UCard>
      <UCard>
        <template #header>
          INACTIVE SUBSCRIPTIONS
        </template>
        <UTable
          :rows="tenant.tenantSubscriptions.filter((s:TenantSubscription) => String(s.status) === 'INACTIVE')"
          :columns="[
            {key: 'licensePackKey', label: 'Key'},
            {key: 'licenseCount', label: '# Licenses'},
            {key: 'status', label: 'Status'}
          ]"
        >
          <template #licenseCount-data="{row}">
            {{ row.licenses.totalCount }}
          </template>
          <template #status-data="{row}">
            <UButton v-if="row.status === 'ACTIVE'" @click="onDeactivateSubscription(row.id)">Deactivate</UButton>
            <UButton v-if="row.status === 'INACTIVE'" @click="onReactivateSubscription(row.id)">Reactivate</UButton>
          </template>
        </UTable>
      </UCard>
    </UCard>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const {
    data,
    error,
    executeQuery
  } = await useTenantByIdQuery({
    variables: {
      tenantId: route.params.id
    }
  })  
  const tenant = ref(data.value?.tenant)

  const deactivateTenantMutation = await useDeactivateTenantMutation()
  const onDeactivateTenant = async () => {
    await deactivateTenantMutation.executeMutation({
      tenantId: tenant.value?.id
    })
    const { data } = await executeQuery({requestPolicy: 'network-only'})
    tenant.value = data.value?.tenant
  }

  const activateTenantMutation = await useActivateTenantMutation()
  const onActivateTenant = async () => {
    await activateTenantMutation.executeMutation({
      tenantId: tenant.value?.id
    })
    await executeQuery({requestPolicy: 'network-only'})
    tenant.value = data.value?.tenant
  }

  const deactivateTenantSubscriptionMutation = await useDeactivateTenantSubscriptionMutation()
  const onDeactivateSubscription = async (tenantSubscriptionId: string) => {
    await deactivateTenantSubscriptionMutation.executeMutation({
      tenantSubscriptionId: tenantSubscriptionId
    })
    await executeQuery({requestPolicy: 'network-only'})
    tenant.value = data.value?.tenant
  }

  const reactivateTenantSubscriptionMutation = await useReactivateTenantSubscriptionMutation()
  const onReactivateSubscription = async (tenantSubscriptionId: string) => {
    await reactivateTenantSubscriptionMutation.executeMutation({
      tenantSubscriptionId: tenantSubscriptionId
    })
    await executeQuery({requestPolicy: 'network-only'})
    tenant.value = data.value?.tenant
  }

  const subscribeTenantToLicensePackMutation = await useSubscribeTenantToLicensePackMutation()
  const onSubscribe = async (licensePackKey: string) => {
    await subscribeTenantToLicensePackMutation.executeMutation({
      tenantId: tenant.value?.id,
      licensePackKey: licensePackKey
    })
    await executeQuery({requestPolicy: 'network-only'})
    tenant.value = data.value?.tenant
  }
</script>
