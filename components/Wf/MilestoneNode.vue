<template>
  <div style="width: 200px;">
    <div :class="`flex flex-col p-1 rounded ${bgColor}`">
      <div class="text-xs">
        {{ uow.data.type }}
      </div>
      <div class="text-sm">
        {{ uow.data.name }}
      </div>
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
  return 'bg-blue-800'
})
</script>

