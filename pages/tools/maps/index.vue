<template>
  <ClientOnly>
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
  </ClientOnly>
</template>

<script lang="ts" setup>
import type { ILocation } from '~/_cruft/db-types';

  const { data, executeQuery } = await useAllLocationsQuery()
  const locations = ref((data.value?.locations?.nodes || []) as unknown as any)
  const markedLocations: Ref<ILocation[]> = ref([])
  const appStateStore = useAppStateStore()

  const onLocationSelected = async (locations: ALocation[]) => {
    markedLocations.value = locations
  }

  const createLocationMutation = await useCreateLocationMutation()
  const onNewLocation = async(locationInfo: LocationInfo) => {
    await createLocationMutation.executeMutation({
      locationInfo: locationInfo
    })
    const { data } = await executeQuery()
    locations.value = (data.value?.locations?.nodes || []) as unknown as any
  }

  const updateLocationMutation = await useUpdateLocationMutation()
  const onUpdateLocation = async(locationInfo: LocationInfo) => {
    const result = await updateLocationMutation.executeMutation({
      locationInfo: locationInfo
    })
    const { data } = await executeQuery()
    locations.value = (data.value?.locations?.nodes || []) as unknown as any
  }

  const screenWidth = computed(() => {
    // @ts-ignore
    return appStateStore.screenWidth - 20
  })
</script>
