<template>
    <UTable
      v-if="abUsers.length"
      :rows="abUsers"
      :columns="[
        {key: 'action'},
        {key: 'email', label: 'Email', sortable: true},
        {key: 'name', label: 'Display Name', sortable: true},
        // {key: 'phone', label: 'Phone', sortable: true},
      ]"
      :sort="{ column: 'name', direction: 'asc' }"
    >
      <template #action-data="{ row }">
        <UButton @click="onInvite(row.email)" :disabled="!row.canInvite" title="Admin users can send invitations to users not yet in their organization.">Invite</UButton>
      </template>
      <template #name-data="{ row }">
        {{ row.displayName }}
      </template>
    </UTable>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    abUsers: any[]
  }>()
  const emit = defineEmits<{
    (e: 'invite', email: string): void
  }>()

  const onInvite = async (email: string) => {
    emit('invite', email)
  }
</script>
