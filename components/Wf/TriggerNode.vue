<template>
  <div :style="containerStyle" :class="`flex flex-col mt-2 rounded grow-1`" @click="report">
    <div class="flex bg-indigo-600 p-1" style=" font-size: small;">
      {{ uow.data.name }}
    </div>
    <!-- these v-if switches are because updating the class/style doesn't work reactively.  this should be investigated -->
    <div v-if="uow.data.status === 'COMPLETE'" :class="`${statusBarClass} bg-green-500`" :style="statusBarStyle">
      <div class="flex">{{ formatDate(new Date(uow.data.updatedAt)) }}</div>
      <div class="flex">{{ uow.data.status }}</div>
    </div>
    <div v-if="uow.data.status === 'ERROR'" :class="`${statusBarClass} bg-red-500`" :style="statusBarStyle">
      <div class="flex">{{ formatDate(new Date(uow.data.updatedAt)) }}</div>
      <div class="flex">{{ uow.data.status }}</div>
    </div>
    <div v-if="['COMPLETE', 'ERROR'].indexOf(uow.data.status) === -1" :class="`${statusBarClass} bg-gray-500`" :style="statusBarStyle">
      <div class="flex">{{ formatDate(new Date(uow.data.updatedAt)) }}</div>
      <div class="flex">{{ uow.data.status }}</div>
    </div>
    <div class="flex text-xs flex-col p-1" style="background-color: dodgerblue;">
      <UButton :disabled="uow.data.status !== 'TRIGGER_SET'" @click="onPullTrigger">Acknowledge</UButton>
      <!-- <pre>{{uow.data}}</pre> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandleConnections, useNodesData, type NodeProps } from '@vue-flow/core'
import { usePullTriggerMutation } from '~/graphql/api';

const props = defineProps<{
  uow: NodeProps<Uow>
}>()

function formatDate(date) {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }) + ' - ' + date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: '3',
    hour12: false
  });
}

const containerStyle = computed(() => {
  return `width: ${props.uow.data.width}px; height: ${props.uow.data.height}px; background-color: ${statusColor};`
})

const statusBarClass = computed(() => {
  return `flex p-1 justify-between`
})

const statusBarStyle = computed(() => {
  return `font-size: xx-small;`
})

// const statusBarClass = computed(() => {
//   return `flex p-1 justify-between ${statusColor.value}`
// })

// const statusBarStyle = computed(() => {
//   return `font-size: xx-small; background-color: ${statusColor.value.split('-')[1]};`
// })

const stepData = computed(() => {
  const { error, ...theRest } = (props.uow.data.data || {})
  if (error) return error.message
  return theRest
})

// const containerStyle = computed(() => {
//   return props.uow.data.style
// })

const connections = useHandleConnections({
  type: 'target',
})

const nodesData = useNodesData(() => connections.value[0]?.source)

const statusColor = computed<string>(() => {
  switch (props.uow.data.status) {
    case 'ERROR':
      return 'bg-red-500'
    case 'COMPLETE':
      return 'bg-green-500'
    default:
      return 'bg-gray-500'
  }
})

const report = () => {
  // alert(JSON.stringify(props.uow,null,2))
}

const pullTriggerMutation = await usePullTriggerMutation();
const onPullTrigger = async () => {
  const { data, error } = await pullTriggerMutation.executeMutation({
      uowId: props.uow.id
    })
    if (error) alert(error.toString())  
}
</script>

