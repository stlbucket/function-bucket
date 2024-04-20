<template>
  <div class="flex grow flex-col">
    <LMap
      ref="map"
      :zoom="zoom"
      :center="focusCenter"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
        
      />
        <l-marker v-for="(l, i) in preppedLocations" 
          :name="l.name"
          :lat-lng="l.coordinates"
          :options="{
            title: l.name
          }"
          draggable
          @update:latLng="onUpdateMarker"
        />
    </LMap>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    locations?: ALocation[]
    initialZoom?: number
    defaultCoordinates?: number[]
  }>(), {
    locations: [],
    initialZoom: 10,
    defaultCoordinates: [47.633120756692605, -122.3486675513685]
  })

  const zoom = ref(props.initialZoom)

  const preppedLocations = ref([])

  const prepLocation = (l: ALocation) => {
    return {
        ...l,
        coordinates: [Number(l.lat), Number(l.lon)]
      }
  }

  onMounted(()=> {
    preppedLocations.value = props.locations.map(l => prepLocation(l))
  })

  watch(
    ()=>props.locations, 
    ()=>{
      preppedLocations.value = props.locations.map(l => prepLocation(l))
    },
    {deep: true}
  )

  const focusCenter = computed(() => {
    const locs = preppedLocations.value
    if (locs.length > 0) {
      const lat = (locs.reduce((s,l) => { return s+l.coordinates[0]}, 0))/locs.length
      const lon = (locs.reduce((s,l) => { return s+l.coordinates[1]}, 0))/locs.length
      return Number(lat) && Number(lon) ? [lat,lon] : props.defaultCoordinates
    } else {
      return props.defaultCoordinates
    }
  })

  const onUpdateMarker = async(marker: any) => {
    console.log(JSON.stringify(marker,null,2))
  }
</script>

<style>
body {
  margin: 0;
}
.leaflet-container {
  z-index: 0 !important;
}
</style>
