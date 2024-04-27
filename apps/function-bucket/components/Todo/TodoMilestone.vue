<template>
  <div class="text-xl flex gap-1">
    <UButton
      size="xs"
      :color="`${String(todoTree.status) === 'COMPLETE' ? 'green' : 'yellow'}`"
      :title="`${completionRatio} subtasks completed`"
      disabled
      class="disabled:cursor-default"
    >{{ completionRatio }}</UButton>
    <UButton 
      :icon="expansionIcon"
      size="xs"
      color="white" 
      square 
      variant="solid" 
      :title="expansionTitle" 
      @click="onToggleExpansion"
    />
    <UButton 
      v-if="!expandedAllChildren"
      icon="i-heroicons-chevron-double-down"
      size="xs"
      color="white" 
      square 
      variant="solid" 
      title="Expand All Children"
      @click="onExpandAllChildren"
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
      :class="`flex ml-5 px-2 rounded items-center bg-ash-grey-${mainDivBgClass}`"
      @onclick="onSelected"
      :title="`MILESTONE  ${todoTree.description || todoTree.name}`"
    >
      <NuxtLink :to="`/tools/todo/${todoTree.id}`"><div class="text-sm">{{ todoTree.name }}</div></NuxtLink>          
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    todoTree: Todo
    expanded: boolean
    expandedAllChildren: boolean
    detailed: boolean
  }>()

  const emit = defineEmits<{
    (e: 'selected', todo: Todo): void
    (e: 'toggleExpansion', todo: Todo): void
    (e: 'expandAllChildren', todo: Todo): void
    (e: 'openDetail', todo: Todo): void
    (e: 'closeDetail', todo: Todo): void
  }>()

  const onOpenDetail = async () => {
    emit('openDetail', props.todoTree)
  }

  const onCloseDetail = async () => {
    emit('closeDetail', props.todoTree)
  }

  const onSelected = async () => {
    emit('selected', props.todoTree)
  }

  const onToggleExpansion = async () => {
    emit('toggleExpansion', props.todoTree)
  }

  const onExpandAllChildren = async () => {
    emit('expandAllChildren', props.todoTree)
  }


  const expansionTitle = computed(() => {
    return `${props.expanded ? 'Collapse' : 'Expand'}`
  })
  const expansionIcon = computed(() => {
    return `${props.expanded ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'}`
  })
  const completionRatio = computed(() => {
    const complete = (props.todoTree.children || []).filter((t:Todo) => t.status.toString().toUpperCase() === 'COMPLETE').length
    const totalCount = (props.todoTree.children || []).length
    return `${complete}/${totalCount}`
  })

  const mainDivBgClass = computed(() => {
    return props.todoTree.parentTodoId ? '700' : '900'
  })
</script>