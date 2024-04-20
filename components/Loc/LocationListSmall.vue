<template>
  <div class="flex flex-col grow">
    <UTable
      class="flex flex-col grow"
      :rows="selectedLocations"
      :columns="[
        {key: 'action'},
        {key: 'loc', label: 'Location'},
      ]"
      selectable
      v-model="selectedLocations"
      :ui="{
        thead: 'hidden',
        td: {
          size: 'text-xs'
        }
      }"
    >
    <template #loc-data="{ row }">
      <LocationCard :location="row" />
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
        <div class="flex justify-center">NO SELECTED LOCATIONS</div>
      </template>
    </UTable>
    <div class="flex">
      <UButton
        @click="searchTerm = undefined"
        icon="i-heroicons-x-mark"
        size="xs"
        color="white" 
        square 
        variant="solid" 
        title="Clear Search Term"
        class=""
      ></UButton>
      <UInput 
        v-model="searchTerm" 
        placeholder="Search locations..." 
        data-1p-ignore
        class="grow"
      />
    </div>
    <UTable
      :rows="filteredLocations"
      :columns="[
        {key: 'action'},
        {key: 'loc', label: 'Location'},
      ]"
      selectable
      v-model="selectedLocations"
      :ui="{
        thead: `hidden`,
        td: {
          size: 'text-xs'
        }
      }"
    >
      <template #action-data="{ row }">
        <LocationModal
          :location="row"
          @update-location="onUpdateLocation"
        ></LocationModal>
      </template>
      <template #loc-data="{ row }">
        <LocationCard :location="row"/>
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
  const searchTerm = ref()

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

  const filteredLocations = computed(() => {
    const selectedLocationIds = selectedLocations.value.map(sl => sl.id)
    return props.locations
      .filter(l => selectedLocationIds.indexOf(l.id) === -1)
      .filter(l => {
        const comparisonString = String(`${l.name}:::${l.address1}:::${l.city}:::${l.state}:::${l.postalCode}:::${l.country}`).toLowerCase()
        return !searchTerm.value || (comparisonString.indexOf(String(searchTerm.value).toLowerCase()) > -1)
      })
  })

  const useBreakpoint = (bp: string) => {
    return typeof window !== 'undefined' && getComputedStyle(document.body).getPropertyValue(`--tw-${bp}`) !== 'false'
  }

  const currentBreakpoint = computed(() => {
    return appStateStore.screenWidth
  })
</script>
