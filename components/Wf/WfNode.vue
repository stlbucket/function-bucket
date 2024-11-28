<template>
  <div :style="containerStyle" :class="`flex flex-col p-1 rounded grow-1`">
    <div class="flex text-xs" style="background-color: green;">
      {{ uow.data.type }} - {{ uow.data.name }} - {{ uow.data.status }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandleConnections, useNodesData, type NodeProps } from '@vue-flow/core'

const props = defineProps<{
uow: NodeProps<Uow>
}>()

const containerStyle = computed(() => {
  return props.uow.data.style
})

const emit = defineEmits<{
(e: 'expand', id: string): void
}>()

const onExpand = () => {
emit('expand', props.uow.id)
}
</script>

