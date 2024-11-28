<template>
  <div :style="containerStyle" :class="`flex flex-col mt-2 rounded ${bgColor} grow-1`" @click="report">
    <div class="flex text-xs" style="background-color: blue;">
      {{ uow.data.type }} - {{ uow.data.name }} - {{ uow.data.status }}
    </div>
    <div class="flex text-xs" style="background-color: deepskyblue;">
      <pre>{{ uow.data.data }}</pre>
    </div>
    <div class="flex text-xs flex-col" style="background-color: dodgerblue;">
      <pre class="text-xs">c: {{ formatDate(new Date(uow.data.createdAt)) }}</pre>
      <pre class="text-xs">u: {{ formatDate(new Date(uow.data.updatedAt)) }}</pre>
      <pre class="text-xs" v-if="uow.data.completedAt">cc: {{ formatDate(new Date(uow.data.completedAt)) }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandleConnections, useNodesData, type NodeProps } from '@vue-flow/core'

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
    hour12: false
  });
}

const containerStyle = computed(() => {
  return `width: ${props.uow.data.width}px; height: ${props.uow.data.height}px; background-color: ${bgColor};`
})

// const containerStyle = computed(() => {
//   return props.uow.data.style
// })

const connections = useHandleConnections({
  type: 'target',
})

const nodesData = useNodesData(() => connections.value[0]?.source)

const bgColor = computed<string>(() => {
  return 'bg-blue-500'
})

const report = () => {
  alert(JSON.stringify(props.uow,null,2))
}
</script>

