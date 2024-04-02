<template>
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
</template>

<script lang="ts" setup>
  const route = useRoute()
  const tenant = ref()

  const loadData = async () => {
    const result = await GqlTenantById({
      tenantId: route.params.id,
    })
    tenant.value = result.tenant
  }
  loadData()

  const onDeactivateTenant = async () => {
    const result = await GqlDeactivateTenant({
      tenantId: tenant.value.id
    })
    await loadData()
  }

  const onActivateTenant = async () => {
    const result = await GqlActivateTenant({
      tenantId: tenant.value.id
    })
    await loadData()
  }

  const onDeactivateSubscription = async (tenantSubscriptionId: string) => {
    const result = await GqlDeactivateTenantSubscription({
      tenantSubscriptionId: tenantSubscriptionId
    })
    await loadData()
  }

  const onReactivateSubscription = async (tenantSubscriptionId: string) => {
    const result = await GqlReactivateTenantSubscription({
      tenantSubscriptionId: tenantSubscriptionId
    })
    await loadData()
  }

  const onSubscribe = async (licensePackKey: string) => {
    const result = await GqlSubscribeTenantToLicensePack({
      tenantId: tenant.value.id,
      licensePackKey: licensePackKey
    })
    await loadData()
  }
</script>
