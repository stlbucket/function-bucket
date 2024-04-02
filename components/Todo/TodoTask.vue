<template>
    <div class="text-xl flex gap-1">
      <UButton 
        v-if="String(todoTree.status) === 'COMPLETE'"
        icon="i-heroicons-check"
        size="xs"
        title="Reopen"
        @click="onReopened"
      />
      <UButton
        v-if="String(todoTree.status) === 'INCOMPLETE'"
        icon="none"
        size="xs"
        color="yellow"
        :title="Boolean(todoTree.isTemplate) ? 'This is a template so no action can be taken' : 'Close'"
        :disabled="Boolean(todoTree.isTemplate)"
        @click="onClosed"
      />
      <UButton 
        v-if="!detailed"
        icon="i-heroicons-arrows-pointing-out"
        size="xs"
        color="white" 
        square 
        variant="solid" 
        title="Open Detail"
        @click="onOpenDetail"
      />
      <UButton 
        v-if="detailed"
        icon="i-heroicons-arrows-pointing-in"
        size="xs"
        color="white" 
        square 
        variant="solid" 
        title="Close Detail"
        @click="onCloseDetail"
      />
      <div
        class="flex ml-5 px-2 rounded items-center bg-ash-grey-800"
        @onclick="onSelected"
        :title="`TASK  ${todoTree.description || todoTree.name}`"
      >
        <NuxtLink :to="`/tools/todo/${todoTree.id}`"><div class="text-sm">{{ todoTree.name }}</div></NuxtLink>          
      </div>
    </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    todoTree: Todo
    detailed: boolean
  }>()

  const emit = defineEmits<{
    (e: 'reopened', todo: Todo): void
    (e: 'closed', todo: Todo): void
    (e: 'selected', todo: Todo): void
    (e: 'openDetail', todo: Todo): void
    (e: 'closeDetail', todo: Todo): void
  }>()

  const onReopened = async () => {
    emit('reopened', props.todoTree)
  }
  const onClosed = async () => {
    emit('closed', props.todoTree)
  }
  const onSelected = async () => {
    emit('selected', props.todoTree)
  }
  const onOpenDetail = async () => {
    emit('openDetail', props.todoTree)
  }
  const onCloseDetail = async () => {
    emit('closeDetail', props.todoTree)
  }
</script>