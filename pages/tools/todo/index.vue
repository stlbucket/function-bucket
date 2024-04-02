<template>
  <UCard>
    <template #header>
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <div class="text-2xl">Todo</div>
          <TodoModal @updated="handleCreate"></TodoModal>
        </div>
        <div class="flex flex-col">
          <div class="text-xs">SEARCH TERM</div>
          <UInput v-model="searchTerm" data-1p-ignore />
        </div>
        <div class="flex gap-2">
          <UButton v-if="showTemplates" @click="showTemplates = false">Hide Templates</UButton>
          <UButton v-else @click="showTemplates = true">Show Templates</UButton>
        </div>
      </div>
    </template>
    <div class="hidden md:flex">
      <TodoList :todos="todos"/>
    </div>
    <div class="flex md:hidden">
      <TodoListSmall :todos="todos"/>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
  const todos = ref([])
  const searchTerm = ref()
  const showTemplates = ref(false)
  const loadData = async () => {
    const result = await GqlSearchTodos({
      searchTerm: searchTerm.value,
      isTemplate: showTemplates.value,
      rootsOnly: true
    })
    todos.value = result.searchTodos.nodes
  }
  loadData()

  watch(()=>searchTerm.value, loadData)
  watch(()=>showTemplates.value, loadData)

  const handleCreate = async (todo: Todo) => {
    const result = await GqlCreateTodo({
      name: todo.name,
      description: todo.description
    })
    await loadData()
  }
</script>
