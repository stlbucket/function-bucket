<template>
  <ClientOnly>
    <UCard v-if="residency"
      :ui="{
        body: {
          base: 'flex flex-col gap-10'
        }
      }"
    >
      <template #header>
        <div class="flex flex-col justify-between md:flex-row">
          <div class="flex">
            <div class="text-2xl">Tenant Resident</div>
          </div>
          <div class="flex gap-2">
            <UButton v-if="residency.status !== 'BLOCKED_INDIVIDUAL' && residency.status !== 'BLOCKED_TENANT'" @click="onBlockResidency" color="red">Block</UButton>
            <UButton v-if="residency.status === 'BLOCKED_INDIVIDUAL'" @click="onUnblockResidency" color="yellow">Unblock</UButton>
          </div>
        </div>
      </template>
      <div class="flex flex-col justify-around md:flex-row">
        <div class="flex flex-col gap-1 p-3">
          <div class="flex text-xs">Email</div>
          <div class="flex">{{ residency.email }}</div>
        </div>
        <div class="flex flex-col gap-1 p-3">
          <div class="flex text-xs">Display Name</div>
          <div class="flex">{{ residency.displayName }}</div>
        </div>
        <div class="flex flex-col gap-1 p-3">
          <div class="flex text-xs">Status</div>
          <div class="flex">{{ residency.status }}</div>
        </div>
      </div>
      <div class="flex flex-col gap-1 grow" :key="componentKey">
        <div class="text-2xl">User Licenses by Application</div>
        <div class="text-sm">Users have one scoped license per application and any number of unscoped licenses</div>
        <div class="flex flex-col gap-2" v-if="residency">
          <LicenseAssignment
            v-for="s in subscriptions"
            :license-pack="s.licensePack" 
            :resident="residency"
            @revoke-license="onRevokeLicense"
            @grant-license="onGrantLicense"
          />
        </div>
      </div>
    </UCard>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useMutation } from '@urql/vue';

  const componentKey = ref(1)
  const route = useRoute()
  const subscriptions: Ref<any[]> = ref([])

  const { data: residentsData, executeQuery: executeResident } = await useResidentByIdQuery({
    variables: {
      residentId: route.params.id,
    }
  })
  // @ts-ignore
  const residency: Ref<Resident> = ref(residentsData.value?.resident)

  const { data: subscriptionsData, executeQuery: executeSubscriptions } = await useTenantSubscriptionsQuery({
    variables: {
      tenantId: residency.value?.tenantId
    }
  })
  subscriptions.value = (subscriptionsData.value?.tenantSubscriptions || []) as any[]

  const reloadData = async() => {
    const { data: residentsData } = await executeResident()
    // @ts-ignore
    residency.value = residentsData.value.resident

    const { data: subscriptionsData } = await useTenantSubscriptionsQuery({
      variables: {
        tenantId: residency.value?.tenantId
      }
    })
    subscriptions.value = (subscriptionsData.value?.tenantSubscriptions || []) as any[]

  }

  const revokeUserLicenseMutation = await useRevokeUserLicenseMutation()
  const onRevokeLicense = async (license:any) => {
    await revokeUserLicenseMutation.executeMutation({
      licenseId: license.id
    })
    await reloadData()
  }

  const grantUserLicenseMutation = await useGrantUserLicenseMutation()
  const onGrantLicense = async (licenseTypeKey: string) => {
    await grantUserLicenseMutation.executeMutation({
      licenseTypeKey: licenseTypeKey,
      residentId: residency.value.id
    })
    await reloadData()
  }

  const blockResidencyMutation = await useBlockResidentMutation()
  const onBlockResidency = async () => {
    await blockResidencyMutation.executeMutation({
      residentId: residency.value.id
    })
    await reloadData()
  }

  const unblockResidencyMutation = await useUnblockResidentMutation()
  const onUnblockResidency = async () => {
    await unblockResidencyMutation.executeMutation({
      residentId: residency.value.id
    })
    await reloadData()
  }
</script>
