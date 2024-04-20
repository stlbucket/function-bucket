<template>
  <ClientOnly>
    <UCard class="flex flex-col grow">
      <div class="hidden md:flex grow">
        <TodoDetail
          v-if="todoTree" 
          :todo-tree="todoTree" 
          @new-location="onNewLocation"
          @update-location="onUpdateLocation"
          @clone-template="onCloneTemplate"
          @make-template="onMakeTemplate"
          @delete="onDelete"
        />
      </div>
      <div class="flex md:hidden grow">
        <TodoDetailSmall 
          v-if="todoTree" 
          :todo-tree="todoTree" 
          @new-location="onNewLocation"
          @update-location="onUpdateLocation"
          @clone-template="onCloneTemplate"
          @make-template="onMakeTemplate"
          @delete="onDelete"
        />
      </div>
    </UCard>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const { data, executeQuery } = await useTodoByIdQuery({
    variables: {
      id: route.params.id
    }
  })
  const todoTree = ref(data.value?.todo)
  const selectedLocations: Ref<ALocation[]> = ref([])

  const loadData = async () => {
    const { data } = await executeQuery({
      id: route.params.id
    })
    todoTree.value = data.value?.todo
  }

  const tabItems = ref([
    {
      slot: 'detail',
      label: 'DETAIL',
    }, 
    {
      slot: 'map',
      label: 'MAP',
    }, 
    // {
    //   slot: 'attachments',
    //   label: 'ATTACHMENTS',
    // }
  ])

  const onLocationSelected = async (locations: ALocation[]) => {
    selectedLocations.value = locations
  }
  const createLocationQuery = await useCreateLocationMutation()
  const onNewLocation = async(locationInfo: LocationInfo) => {
    await createLocationQuery.executeMutation({
      locationInfo: locationInfo
    })
    await loadData()
  }
  const updateLocationQuery = await useUpdateLocationMutation()
  const onUpdateLocation = async(locationInfo: LocationInfo) => {
    await updateLocationQuery.executeMutation({
      locationInfo: locationInfo
    })
    await loadData()
  }
  const makeTemplateFromTodoMutation = await useMakeTemplateFromTodoMutation()
  const onMakeTemplate = async () => {
    if (!todoTree.value?.id) return
    const result = await makeTemplateFromTodoMutation.executeMutation({
      todoId: todoTree.value.id
    })
    navigateTo(`/tools/todo/${result.data?.makeTemplateFromTodo?.todo?.id}`)
  }
  const makeTodoFromTemplateMutation = await useMakeTodoFromTemplateMutation()
  const onCloneTemplate = async () => {
    if (!todoTree.value?.id) return
    const result = await makeTodoFromTemplateMutation.executeMutation({
      todoId: todoTree.value.id
    })
    navigateTo(`/tools/todo/${result.data?.makeTodoFromTemplate?.todo?.id}`)
  }
  const deleteTodoMutation = await useDeleteTodoMutation()
  const onDelete = async(todoId: string) => {
    const forSure = confirm(`Are you sure you want to delete: ${todoId}`)
    const result = await deleteTodoMutation.executeMutation({
      todoId: route.params.id
    })
    navigateTo('/tools/todos')
  }
  const onAddAttachment = async () => {
    alert('NOT IMPLEMENTED')
  }

</script>
