<template>
  <UCard class="flex flex-col grow">
    <template #header>
      <div class="flex justify-between">
        <div class="flex gap-5">
          <div class="text-2xl">WE HEART TODO:</div>
          <div class="text-2xl">{{ todoTree.name }}</div>
        </div>
        <div class="flex gap-5">
          <NuxtLink v-if="todoTree.parentTodoId" :to="`/tools/todo/${todoTree.parentTodoId}`">To Parent</NuxtLink>
          <NuxtLink v-if="todoTree.parentTodoId" :to="`/tools/todo/${todoTree.rootTodoId}`">Back to Project</NuxtLink>
        </div>
      </div>
    </template>
    <div class="flex gap-2">
      <div class="flex max-w-[50%] min-w-[50%]">
        <UTabs 
          :items="tabItems" 
          :ui="{
            container: 'flex flex-col grow w-full',
            base: 'focus:outline-none flex flex-col grow',
            wrapper: 'flex flex-col grow space-y-2'
          }"
        >
          <template #detail="{ item }">
            <div class="flex flex-col gap-2">
              <TodoInfo
                :todo="todoTree"
                @make-template="onMakeTemplate"
                @clone-template="onCloneTemplate"
                @delete="onDelete"
              />
              <UCard>
                <template #header>
                  <div class="flex justify-center">TASKS</div>
                </template>
                <TodoTree 
                  :todo-id="todoTree.id"
                  :tree-level="0"
                />
              </UCard>
            </div>
          </template>
          <template #map="{ item }">
            <div class="flex flex-col gap-2 grow min-h-[600px]">
              <div class="flex grow">
                <MarkerMap 
                  :locations="selectedLocations"
                />
              </div>
              <UCard>
                <template #header>
                  <div class="flex justify-center">LOCATIONS</div>
                </template>
                <LocationList 
                  :locations="todoTree.location ? [todoTree.location] : []"
                  :pre-selected="todoTree.location ? [todoTree.location] : []"
                  @location-selected="onLocationSelected"
                  @update-location="onUpdateLocation"
                  :show-new="false"
                  :show-delete="false"
                  :show-headers="false"
                />
              </UCard>
            </div>
          </template>
        </UTabs>          
      </div>
      <div class="flex grow flex-col gap-2">
        <UTable
          :rows="[]"
          :ui="{
            thead: 'hidden'
          }"
        >
          <template #empty-state>
            <UCard>
              <template #header>
                <div class="flex justify-center">ATTACHMENTS</div>
              </template>
              <div class="flex justify-between">
                <UButton label="Add an attachment" @click="onAddAttachment" />
                <div class="text-xs"><a target="_blank" href="https://supabase.com/docs/guides/storage">Supabase Storage Guide</a></div>
              </div>
            </UCard>
          </template>
        </UTable>
        <div class="flex grow">
          <MsgTopic
            :topicId="todoTree.topicId"
            title="GROUP DISCUSSION"
          />
        </div>
      </div>      
    </div>        
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
