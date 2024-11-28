<template>
  <div :style="containerStyle" :class="`flex flex-col mt-2 rounded ${bgColor} grow-1`" @click="report">
    <div class="flex text-xs" style="background-color: blue;">
      {{ uow.data.type }} - {{ uow.data.name }} - {{ uow.data.status }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandleConnections, useNodesData, type NodeProps } from '@vue-flow/core'

const props = defineProps<{
  uow: NodeProps<Uow>
}>()

watch(() => props.uow, () => {
  alert('boom')
}, {
  deep: true
})

const containerStyle = computed(() => {
  return props.uow.data.style
})

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

