<template>
  <div class="flex flex-col gap-3 grow">
    <div class="flex grow" v-for="r in residents">
      <div class="flex flex-col gap-1 grow">
        <div class="flex">
          <NuxtLink :to="`/admin/app-tenant-residencies/${r.id}`">{{ r.email }}</NuxtLink>
        </div>
        <div class="flex justify-end">
          {{ r.tenantName }}
        </div>
        <div class="flex justify-end">
          <UButton v-if="rowActionName" @click="handleRowAction(r)">{{rowActionName}}</UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

  const props = defineProps<{
    residents: Resident[]
    rowActionName?: string
    showEmail?: boolean
    showDisplayName?: boolean
    disableSort?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'rowAction', row: Resident): void
  }>()

  const handleRowAction = async (row: Resident) => {
    emit('rowAction', row)
  }

  const columns = computed(()=>{
    return [
      {key: 'action'},
      {key: 'displayName', label: 'Display Name', sortable: !props.disableSort},
      {key: 'email', label: 'Email', sortable: !props.disableSort},
      {key: 'status', label: 'Status', sortable: !props.disableSort},
      {key: 'tenantName', label: 'Tenant', sortable: !props.disableSort},
    ]
    .filter(c => c.key !== 'displayName' || props.showDisplayName )
    .filter(c => c.key !== 'email'  || props.showEmail)
    .filter(c => c.key !== 'action'  || props.rowActionName)
  })

</script>