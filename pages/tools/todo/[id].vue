<template>
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
</template>

<script lang="ts" setup>
  const route = useRoute()
  const todoTree = ref()
  const selectedLocations: Ref<ALocation[]> = ref([])

  const loadData = async () => {
    const result = await GqlTodoById({
      id: route.params.id
    })
    todoTree.value = result.todo
  }
  loadData()

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
  const onNewLocation = async(locationInfo: LocationInfo) => {
    const result = await GqlCreateLocation({
      locationInfo: locationInfo
    })
    await loadData()
  }
  const onUpdateLocation = async(locationInfo: LocationInfo) => {
    const result = await GqlUpdateLocation({
      locationInfo: locationInfo
    })
    await loadData()
  }

  const onMakeTemplate = async () => {
    const result = await GqlMakeTemplateFromTodo({
      todoId: todoTree.value.id
    })
    navigateTo(`/tools/todo/${result.makeTemplateFromTodo.todo.id}`)
  }

  const onCloneTemplate = async () => {
    const result = await GqlMakeTodoFromTemplate({
      todoId: todoTree.value.id
    })
    navigateTo(`/tools/todo/${result.makeTodoFromTemplate.todo.id}`)
  }

  const onDelete = async(todoId: string) => {
    const forSure = confirm(`Are you sure you want to delete: ${todoId}`)
    alert(forSure)
    // const result = await GqlDeleteIncident({
    //   incidentId: incident.value.id
    // })
    // navigateTo('/incidents')
  }
  const onAddAttachment = async () => {
    alert('NOT IMPLEMENTED')
  }

</script>
