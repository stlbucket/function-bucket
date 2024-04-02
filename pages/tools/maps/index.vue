<template>
  <UCard
    :ui="{

    }"
  >
    <template #header>
      <div class="flex justify-between">
        <div class="flex text-xl">LOCATIONS</div>
        <LocationModal
          @new-location="onNewLocation"
        ></LocationModal>
      </div>
    </template>
    <div class="flex gap-2 flex-col">
      <div class="flex min-h-[300px]">
        <MarkerMap :locations="markedLocations" />
      </div>
      <LocationListSmall
        :locations="locations" 
        @locationSelected="onLocationSelected"
        :preSelected="[]"
        @new-location="onNewLocation"
        @update-location="onUpdateLocation"
      />
    </div>
  </UCard>
</template>

<script lang="ts" setup>
  const locations: Ref<ALocation[]> = ref([])
  const markedLocations: Ref<ALocation[]> = ref([])
  const appStateStore = useAppStateStore()

  const loadData = async () => {
    const result = await GqlAllLocations()
    locations.value = result.locations.nodes.reduce((a: ALocation[],l: ALocation) => {
      const existing = a.find((al: ALocation) => al.name === l.name)
      return existing ? a : [...a, l]
    }, [])
  }
  loadData()

  const onLocationSelected = async (locations: ALocation[]) => {
    markedLocations.value = locations
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

  const screenWidth = computed(() => {
    return appStateStore.screenWidth - 20
  })
</script>
