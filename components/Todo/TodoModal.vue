<template>
  <UButton v-if="todo" icon="i-heroicons-pencil" size="xs" color="white" title="Edit Todo"  @click="showModal = true"/>
  <UButton v-else icon="i-heroicons-plus-circle" size="xs" color="white" :title="addButtonTitle"  @click="showModal = true"/>
  <UModal v-model="showModal">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        {{ `${parentTodo ? 'Add Subtask' : `${todo ? 'Edit Todo' : 'New Todo'}`}` }}
      </template>
      <div class="flex flex-col gap-3">
        <UFormGroup name="name" label="Name">
          <UInput placeholder="name your todo" v-model="formData.name" type="text"  data-1p-ignore/>
        </UFormGroup>
        <UFormGroup name="description" label="Description">
          <UTextarea placeholder="describe your todo" v-model="formData.description" type="text" class="flex" data-1p-ignore/>
        </UFormGroup>
      </div>
      <template #footer>
        <div class="flex gap-1">
          <UButton @click="showModal = false">Cancel</UButton>
          <UButton @click="handleSave" :disabled="saveTodoDisabled">Save</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    todo?: Todo
    parentTodo?: Todo
  }>()

  const showModal = ref(false)

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
    (e: 'updated', todo: Todo): void
  }>()

  const handleSave = async () => {
    showModal.value = false
    emit('updated', {
      ...props.todo,
      ...formData.value,
      parentTodoId: props.parentTodo?.id.toString()
    } as Todo)
    formData.value = defaultFormData
  }

  const saveTodoDisabled = computed(() => {
    return (!formData.value.name) || (formData.value.name.length < 4)
  })

  const addButtonTitle = computed(() => {
    return props.parentTodo ? 'Add Subtask' : 'Add Todo'
  })
</script>