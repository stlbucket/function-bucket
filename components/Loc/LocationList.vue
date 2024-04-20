<template>
  <div class="flex flex-col grow">
    <UTable
      class="flex flex-col grow"
      :rows="selectedLocations"
      :columns="[
        {key: 'action'},
        {key: 'name', label: 'Name'},
        {key: 'loc', label: 'Location'},
      ]"
      selectable
      v-model="selectedLocations"
      :ui="{
        thead: `${showHeaders ? '' : 'hidden'} sticky`,
        tbody: 'overflow-y-scroll',
        // tbody: `divide-y divide-gray-200 dark:divide-gray-800 scroll-smooth`,
        th: {
          base: 'text-left rtl:text-right sticky'
        },
        td: {
          size: 'text-xs'
        }
      }"
    >
      <template #name-data="{ row }">
        <UPopover mode="hover">
          {{ row.name }}
          <template #panel>
            <pre>{{ JSON.stringify(row,null,2) }}</pre>
          </template>
        </UPopover>        
      </template>
      <template #loc-data="{ row }">
        <UPopover mode="hover">
          {{ row.address1 }}
          <template #panel>
            <pre>{{ JSON.stringify(row,null,2) }}</pre>
          </template>
        </UPopover>        
      </template>
      <template #action-data="{ row }">
        <LocationModal
          :location="row"
          @update-location="onUpdateLocation"
        ></LocationModal>
        <UButton
          v-if="showDelete"
          @click="onDeleteLocation(row)"
          icon="i-heroicons-x-mark"
          size="xs"
          color="white" 
          square 
          variant="solid" 
          title="Expand All Children"
        ></UButton>
      </template>
      <template #empty-state>
        NO SELECTED LOCATIONS
      </template>
    </UTable>
    <UTable
      :rows="locations.filter(l => selectedLocations.map(sl => sl.id).indexOf(l.id) === -1).slice(0,17)"
      :columns="[
        {key: 'action'},
        {key: 'name', label: 'Name'},
        {key: 'loc', label: 'Location'},
      ]"
      selectable
      v-model="selectedLocations"
      :ui="{
        // thead: `${showHeaders ? '' : 'hidden'} sticky`,
        thead: `hidden`,
        tbody: 'overflow-y-scroll',
        // tbody: `divide-y divide-gray-200 dark:divide-gray-800 scroll-smooth`,
        th: {
          base: 'text-left rtl:text-right sticky'
        },
        td: {
          size: 'text-xs'
        }
      }"
    >
      <template #name-data="{ row }">
        <UPopover mode="hover">
          {{ row.name }}
          <template #panel>
            <pre>{{ JSON.stringify(row,null,2) }}</pre>
          </template>
        </UPopover>        
      </template>
      <template #loc-data="{ row }">
        <UPopover mode="hover">
          {{ row.address1 }}
          <template #panel>
            <pre>{{ JSON.stringify(row,null,2) }}</pre>
          </template>
        </UPopover>        
      </template>
      <template #action-data="{ row }">
        <LocationModal
          :location="row"
          @update-location="onUpdateLocation"
        ></LocationModal>
        <UButton
          v-if="showDelete"
          @click="onDeleteLocation(row)"
          icon="i-heroicons-x-mark"
          size="xs"
          color="white" 
          square 
          variant="solid" 
          title="Expand All Children"
        ></UButton>
      </template>
      <template #empty-state>
        <div class="flex justify-center">NO UNSELECTED LOCATIONS</div>
      </template>
    </UTable>
  </div>
</template>

<script lang="ts" setup>
  const appStateStore = useAppStateStore()
  const props = withDefaults(defineProps<{
    locations: ALocation[],
    preSelected: ALocation[],
    showHeaders?: boolean,
    showNew?: boolean,
    showDelete?: boolean
  }>(), {
    showHeaders: true,
    showNew: true,
    showDelete: true
  })
  const selectedLocations: Ref<ALocation[]> = ref([])
  
  const emit = defineEmits<{
    (e: 'locationSelected', locations: ALocation[]): void
    (e: 'newLocation', LocationInfo: LocationInfo): void,
    (e: 'updateLocation', LocationInfo: LocationInfo): void    
    (e: 'deleteLocation', LocationInfo: LocationInfo): void        
  }>()

  const onNewLocation = async (locationInfo: LocationInfo) => {
    emit('newLocation', locationInfo)
  }

  const onUpdateLocation = async (locationInfo: LocationInfo) => {
    emit('updateLocation', locationInfo)
  }

  const onDeleteLocation = async (locationInfo: LocationInfo) => {
    const result = confirm('Are you sure you want to delete?')
    
    emit('updateLocation', locationInfo)
  }

  watch(()=>selectedLocations.value, ()=>{
    emit('locationSelected', selectedLocations.value)
  })
  
  onMounted(()=>{
    selectedLocations.value = props.preSelected || []
  })


  const useBreakpoint = (bp: string) => {
    return typeof window !== 'undefined' && getComputedStyle(document.body).getPropertyValue(`--tw-${bp}`) !== 'false'
  }

  const currentBreakpoint = computed(() => {
    return appStateStore.screenWidth
  })
</script>
