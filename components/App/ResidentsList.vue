<template>
  <UTable
    :rows="rows"
    :columns="columns"
    :sort="{ column: 'tenantName', direction: 'asc' }"
    :sortable="!disableSort"
    class="grow"
  >
    <template #email-data="{ row }">
      <NuxtLink :to="`/admin/app-tenant-residencies/${row.id}`">{{ row.email }}</NuxtLink>
    </template>
    <template #assume-data="{ row }">
      <!-- <UButton @click="onAssume(row)">{{ String(row.status).toLowerCase() === 'active' ? 'Refresh' : 'Select' }}</UButton> -->
      <UButton @click="onAssume(row)" :class="`${String(row.status).toLowerCase() === 'active' ? 'invisible' : ''}`">Select</UButton>
    </template>
    <template #license-data="{ row }">
      <div class="flex flex-col">
        <div v-for="l in row.licenses" :class="`flex gap-1`">
          <div :class="`${l.class}`">
            <UIcon name="i-heroicons-shield-check"/>
          </div>
          {{ l.licenseTypeKey }}
        </div>
      </div>
    </template>
    <template #decline-data="{ row }">
      <UButton v-if="String(row.status).toLowerCase() === 'invited'" @click="onDecline(row)" color="red">Decline</UButton>
      <div v-else></div>
    </template>
    <template #support-data="{ row }">
      <UButton v-if="showSupport" @click="onSupport(row)" color="green">Support</UButton>
      <div v-else></div>
    </template>
  </UTable>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    residents: Resident[]
    showEmail?: boolean
    showDisplayName?: boolean
    disableSort?: boolean
    showAssume?: boolean
    showDecline?: boolean
    showLicenses?: boolean
    showSupport?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'assume', row: Resident): void
    (e: 'decline', row: Resident): void
    (e: 'support', row: Resident): void
  }>()

  const onAssume = async (row: Resident) => {
    emit('assume', row)
  }

  const onDecline = async (row: Resident) => {
    emit('decline', row)
  }

  const onSupport = async (row: Resident) => {
    emit('support', row)
  }

  const columns = computed(()=>{
    return [
      {key: 'support'},
      {key: 'assume'},
      {key: 'displayName', label: 'Display Name', sortable: !props.disableSort},
      {key: 'email', label: 'Email', sortable: !props.disableSort},
      {key: 'status', label: 'Status', sortable: !props.disableSort},
      {key: 'tenantName', label: 'Tenant', sortable: !props.disableSort},
      {key: 'type', label: 'Type', sortable: !props.disableSort},
      {key: 'license', label: 'Licenses', sortable: !props.disableSort},
      {key: 'decline'},
    ]
    .filter(c => c.key !== 'displayName' || props.showDisplayName )
    .filter(c => c.key !== 'email'  || props.showEmail)
    .filter(c => c.key !== 'assume'  || props.showAssume)
    .filter(c => c.key !== 'decline'  || props.showDecline)
    .filter(c => c.key !== 'support'  || props.showSupport)
    .filter(c => c.key !== 'license' || props.showLicenses)
  })

  const rows = computed(() => {
    return props.residents.map(r => {
      return {
        ...r,
        licenses: (r.licenses || []).map(l => {
          return {
            ...l,
            class: `p-1 m-1 rounded text-black text-xs ${licenseColor(l.licenseType)}`
          }          
        })
      }
    })
  })

  const licenseColor = (licenseType: any) => {
    switch (licenseType.assignmentScope) {
      case 'SUPERADMIN':
        return 'bg-red-600'
      case 'ADMIN':
        return 'bg-yellow-600'
      case 'USER':
        return 'bg-green-600'
      default:
        return 'bg-blue-600'
      }
  }

</script>