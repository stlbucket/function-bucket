<template>
  <UCard>
    <template #header>
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <div class="text-2xl">Todo</div>
          <TodoModal @updated="handleCreate" show-text-button ></TodoModal>
        </div>
        <div class="flex flex-col">
          <div class="text-xs">SEARCH TERM</div>
          <UInput v-model="variables.searchTerm" data-1p-ignore />
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
  const showTemplates = ref(false)
  const variables = reactive({
    searchTerm: '',
    isTemplate: showTemplates.value,
    rootsOnly: true
  })
  const { data, executeQuery } = await useSearchTodosQuery({
    variables: variables
  })
  const todos = ref((data.value?.searchTodos?.nodes || []) as unknown as Todo[])

  const reload = async () => {
    const { data } = await executeQuery({
      requestPolicy: 'network-only'
    })
    todos.value = (data.value?.searchTodos?.nodes || []) as unknown as Todo []
  }

  watch(()=>variables.searchTerm, reload)

  const createTodoMutation = await useCreateTodoMutation()
  const handleCreate = async (todo: Todo) => {
    const { data, error } = await createTodoMutation.executeMutation({
      name: todo.name,
      description: todo.description
    })
    if (!error) {
      await navigateTo(`/tools/todo/${data?.createTodo?.todo?.id}`)
    }
  }
</script>
