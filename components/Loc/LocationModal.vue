<template>
  <UButton
    @click="showModal = true"
    :icon="`${location ? 'i-heroicons-pencil' : 'i-heroicons-plus-circle'}`"
    size="xs"
    color="white" 
    square 
    variant="solid" 
    title="Expand All Children"
  ></UButton>
  <UModal
    v-model="showModal"
    :ui="{
      'base': 'relative text-left rtl:text-right overflow-hidden w-full flex flex-col min-w-[70%]',
    }
    "
  >
    <div class="flex gap-1">
      <UCard :ui="{ 
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }">
        <template #header>
          Location
        </template>
        <div class="flex flex-col gap-">
          <UFormGroup name="lat" label="Lat">
            <UInput placeholder="lat" v-model="formData.lat" type="text" data-1p-ignore/>
          </UFormGroup>
          <UFormGroup name="lon" label="Lon">
            <UInput placeholder="lon" v-model="formData.lon" type="text" data-1p-ignore/>
          </UFormGroup>
          <div class="pt-2 pb-4"><UButton @click="onGeoLocate">GeoLocate</UButton></div>
          <UFormGroup name="name" label="Name">
            <UInput placeholder="name" v-model="formData.name" type="text" data-1p-ignore/>
          </UFormGroup>
          <UFormGroup name="address1" label="Address">
            <UInput placeholder="address1" v-model="formData.address1" type="text" data-1p-ignore/>
          </UFormGroup>
          <UFormGroup name="city" label="City">
            <UInput placeholder="city" v-model="formData.city" type="text" data-1p-ignore/>
          </UFormGroup>
          <UFormGroup name="state" label="State">
            <UInput placeholder="state" v-model="formData.state" type="text" data-1p-ignore/>
          </UFormGroup>
          <UFormGroup name="postalCode" label="Postal Code">
            <UInput placeholder="postalCode" v-model="formData.postalCode" type="text" data-1p-ignore/>
          </UFormGroup>
          <UFormGroup name="country" label="Country">
            <UInput placeholder="country" v-model="formData.country" type="text" data-1p-ignore/>
          </UFormGroup>
        </div>
        <template #footer>
          <div class="flex gap-1">
            <UButton @click="showModal = false">Cancel</UButton>
            <UButton @click="handleSave" :disabled="saveLocationDisabled">Save</UButton>
          </div>
        </template>
      </UCard>
      <MarkerMap 
        :locations="mappedLocations"
      />
    </div>
  </UModal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    location?: ALocation
  }>()
  const showModal = ref(false)

  const mappedLocations: Ref<ALocation[]> = ref([])

  const formData: Ref<LocationInfo> = ref({
    id: undefined,
    name: 'beef tacos',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '98109',
    country: '',
    lat: '',
    lon: ''
  })

  onMounted(() => {
    if (props.location) {
      formData.value = {
      id: props.location.id,
      name: props.location.name,
      address1: props.location.address1,
      address2: props.location.address2,
      city: props.location.city,
      state: props.location.state,
      postalCode: props.location.postalCode,
      country: props.location.country,
      lat: props.location.lat,
      lon: props.location.lon
      } as unknown as LocationInfo
    }
  })

  const emit = defineEmits<{
    (e: 'newLocation', LocationInfo: LocationInfo): void,
    (e: 'updateLocation', LocationInfo: LocationInfo): void    
  }>()

  const handleSave = async () => {
    showModal.value = false
    if (props.location) {
      emit('updateLocation', {
        id: props.location.id,
        ...formData.value
      } as LocationInfo)
    } else {
      emit('newLocation', formData.value)
    }
  }

  const saveLocationDisabled = computed(() => {
    return false
    // return (!formData.value.name) || (formData.value.name.length < 4)
  })

  const onGeoLocate = async () => {
    const streetAddress = `https://geocode.maps.co/search?q=${formData.value.address1} ${formData.value.city} ${formData.value.state} ${formData.value.postalCode}`
    const encodedURI = encodeURI(streetAddress)
    const { data, error } = await useFetch(encodedURI)
    if (error.value) {
      alert(error.value)
    } else {
      const location = data.value[0]
      formData.value.lat = location.lat
      formData.value.lon = location.lon
      const aLocation: ALocation = formData.value as unknown as ALocation
      mappedLocations.value = [aLocation]
    }
  }
</script>