<template>
  <div class="flex flex-col gap-3 grow">
    <div class="flex grow justify-between " v-for="r in sortedResidents">
      {{ r.tenantName }}
      <UButton @click="handleRowAction(r)" :class="`${String(r.status).toLowerCase() === 'active' ? 'invisible' : ''}`">Work Here</UButton>
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

  const sortedResidents = computed(() => {
    return props.residents.sort((a,b) => a.tenantName < b.tenantName ? -1 : 1)
  })
</script>