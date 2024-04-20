<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <TodoModal
          :todo="todo"
          @updated="onUpdated"
        />
        <div class="flex gap-2">
          <div class="flex" v-if="!todo.isTemplate">
            <UButton 
              icon="i-heroicons-document-duplicate"
              size="xs"
              color="blue" 
              square 
              variant="solid" 
              title="Make Template"
              @click="onMakeTemplate"
              v-if="showMakeTemplate"
            />
          </div>
          <div class="flex" v-if="todo.isTemplate">
            <UButton color="blue" @click="onNewTodo">New Todo</UButton>
          </div>
          <UButton 
            icon="i-heroicons-minus-circle"
            size="xs"
            color="red" 
            square 
            variant="solid" 
            title="Delete"
            @click="onDelete"
          />
        </div>
      </div>
    </template>
    <div class="flex grow min-h-[200px]">
      <UTextarea
        :model-value="description"
        disabled
        :ui="{
          wrapper: 'flex grow'
        }"
      />
    </div>
  </UCard>
</template>

<script lang="ts" setup>
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const props = defineProps<{
    todo: Todo
  }>()

  const emit = defineEmits<{
    (e: 'updated', todoInfo: Todo): void
    (e: 'open'): void
    (e: 'close'): void
    (e: 'delete'): void
    (e: 'makeTemplate'): void,
    (e: 'cloneTemplate'): void
  }>()

  const description = computed((): string => {
    return props.todo.description ?? ''
  })

  const onUpdated = async(todoInfo: Todo) => {
    emit('updated', todoInfo)
  }

  const onOpen = async () => {
    emit('open')
  }

  const onClose = async () => {
    emit('close')
  }

  const onDelete = async () => {
    emit('delete')
  }

  const onMakeTemplate = async () => {
    emit('makeTemplate')
  }

  const onNewTodo = async () => {
    emit('cloneTemplate')
  }

  const showMakeTemplate = computed(() => {
    return claimsHasPermission(currentProfileClaims.value, 'p:todo-admin')
  })
</script>