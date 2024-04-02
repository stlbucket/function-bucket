<template>
  <UCard class="grow">
    <template #header>
      <div class="flex justify-between">
        <div class="flex flex-col">
          <div class="">WE HEART TODO</div>
          <div class="">{{ todoTree.name }}</div>
        </div>
        <div class="flex gap-5">
          <NuxtLink v-if="todoTree.parentTodoId" :to="`/tools/todo/${todoTree.parentTodoId}`">To Parent</NuxtLink>
          <NuxtLink v-if="todoTree.parentTodoId" :to="`/tools/todo/${todoTree.rootTodoId}`">Back to Project</NuxtLink>
        </div>
      </div>
    </template>
    <UTabs 
      :items="tabItems" 
      :ui="{
        list: {
          tab: {
            base: 'relative inline-flex items-center justify-center flex-shrink-0 w-full whitespace-nowrap focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out'
          }
        }
      }"
    >
      <template #detail="{ item }">
        <TodoInfo
          :todo="todoTree"
          @make-template="onMakeTemplate"
          @clone-template="onCloneTemplate"
          @delete="onDelete"
        />
        <TodoTree 
          :todo-id="todoTree.id"
          :tree-level="0"
        />
      </template>
      <template #chat="{ item }">
        <div class="flex grow">
          <MsgTopic
            :topicId="todoTree.topicId"
            title="GROUP DISCUSSION"
          />
        </div>
      </template>
      <template #map="{ item }">
        <div class="flex flex-col gap-2 grow">
          <div class="flex min-h-[300px]">
            <MarkerMap :locations="selectedLocations" />
          </div>
          <LocationList 
            :locations="todoTree.location ? [todoTree.location] : []"
            :pre-selected="todoTree.location ? [todoTree.location] : []"
            @location-selected="onLocationSelected"
            @update-location="onUpdateLocation"
            :show-new="false"
            :show-delete="false"
            :show-headers="false"
          />
        </div>
      </template>
    </UTabs>
  </UCard>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    todoTree: Todo
  }>()

  const selectedLocations: Ref<ALocation[]> = ref([])

  const tabItems = ref([
    {
      slot: 'detail',
      label: 'DETAIL',
    }, 
    {
      slot: 'chat',
      label: 'CHAT',
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
  
  const emit = defineEmits<{
    (e: 'new-location', locationInfo: LocationInfo): void
    (e: 'update-location', locationInfo: LocationInfo): void
    (e: 'make-template', todoId: string): void
    (e: 'clone-template', todoId: string): void
    (e: 'delete', todoId: string): void
  }>()

  const onLocationSelected = async (locations: ALocation[]) => {
    selectedLocations.value = locations
  }
  const onNewLocation = async(locationInfo: LocationInfo) => {
    emit('new-location', locationInfo)
  }
  const onUpdateLocation = async(locationInfo: LocationInfo) => {
    emit('update-location', locationInfo)
  }

  const onMakeTemplate = async () => {
    emit('make-template', props.todoTree.id)
  }

  const onCloneTemplate = async () => {
    emit('clone-template', props.todoTree.id)
  }

  const onDelete = async() => {
    emit('delete', props.todoTree.id)
  }

  const onAddAttachment = async () => {
    alert('NOT IMPLEMENTED')
  }

</script>
