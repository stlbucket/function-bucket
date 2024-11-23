<template>
  <div :class="`flex flex-col p-1 rounded ${bgColor}`">
    <div class="text-xs">
       UOW - {{ uow.data.type }}
    </div>
    <div class="text-sm">
      {{ uow.data.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandleConnections, useNodesData, type NodeProps } from '@vue-flow/core'

const props = defineProps<{
  uow: NodeProps<Uow>
}>()

const connections = useHandleConnections({
  type: 'target',
})

const nodesData = useNodesData(() => connections.value[0]?.source)

const bgColor = computed<string>(() => {
  // console.log(JSON.stringify(props.uow,null,2))
  switch (props.uow.data.type) {
    case "TASK":
      return 'bg-blue-400'
    case "MILESTONE":
      return 'bg-blue-600'
    case "WF":
      return 'bg-blue-800'
  }
  return 'bg-blue-900'
})
</script>

