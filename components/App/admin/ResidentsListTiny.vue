<template>
  <div class="flex flex-col gap-1 justify-center">
    <div class="flex flex-col justify-between border-2 rounded p-2 justify-center" v-for="r in sortedResidents">
      <div v-if="showDisplayName">{{ r.displayName }}</div>
      <div v-if="showEmail"><NuxtLink :to="`/admin/app-tenant-residencies/${r.id}`">{{ r.email }}</NuxtLink></div>
      <div v-if="showTenantName" 
        :class="`flex justify-center ${beTiny ? 'text-xs' : 'text-2xl'}`"
      >
        {{ r.tenantName }}
      </div>
      <UButton v-if="rowActionName"
        @click="handleRowAction(r)"
        :class="`${String(r.status).toLowerCase() === 'active' ? 'invisible' : ''} w-full ${beTiny ? 'text-xs' : 'text-xl'} flex justify-center`"
      >{{ rowActionName }}</UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>

  const props = defineProps<{
    residents: Resident[]
    rowActionName?: string
    showTenantName?: boolean
    showEmail?: boolean
    showDisplayName?: boolean
    disableSort?: boolean,
    beTiny?: boolean
  }>()

  const emit = defineEmits<{
    (e: 'rowAction', row: Resident): void
  }>()

  const handleRowAction = async (row: Resident) => {
    emit('rowAction', row)
  }

  // const columns = computed(()=>{
  //   return [
  //     {key: 'action'},
  //     {key: 'tenantName', label: 'Workspace', sortable: !props.disableSort},
  //     {key: 'status', label: 'Status', sortable: !props.disableSort},
  //     {key: 'displayName', label: 'Display Name', sortable: !props.disableSort},
  //     {key: 'email', label: 'Email', sortable: !props.disableSort},
  //   ]
  //   .filter(c => c.key !== 'displayName' || props.showDisplayName )
  //   .filter(c => c.key !== 'email'  || props.showEmail)
  //   .filter(c => c.key !== 'action'  || props.rowActionName)
  // })

  const sortedResidents = computed(() => {
    return props.residents.sort((a,b) => a.tenantName < b.tenantName ? -1 : 1)
  })
</script>