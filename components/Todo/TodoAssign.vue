<template>
  <UButton icon="i-heroicons-user" size="xs" color="white"  title="Close" @click="handleBeginAssign"/>
  <UModal v-model="showModal">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        Assign Todo
      </template>
      <div class="flex flex-col gap-3">
        <UFormGroup name="assignedTo" label="Assigned to">
          <USelect v-model="assignedResidentId" :options="profileResidents" option-attribute="name" />    
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex gap-1">
          <UButton @click="showModal = false">Cancel</UButton>
          <UButton @click="handleSave">Save</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    todo?: Todo
  }>()

  const showModal = ref(false)

  const assignedResidentId = ref()

  const profileResidents = ref()

  const defaultFormData = {
    name: '',
    description: ''
  }
  const formData = ref(defaultFormData)

  onMounted(() => {
    formData.value = {
      name: props.todo?.name || '',
      description: props.todo?.description || ''
    }
  })

  const emit = defineEmits<{
    (e: 'assigned', residentId: string): void
  }>()

  const handleBeginAssign = async () => {
    const result = await GqlTenantResidents()
    profileResidents.value = result.residents.nodes.map(n => {
      return {
        name: n.displayName,
        value: n.id
      }
    })
    assignedResidentId.value = props.todo?.owner?.residentId
    showModal.value = true
  }

  const handleSave = async () => {
    emit('assigned', assignedResidentId.value)
    showModal.value = false
  }
</script>