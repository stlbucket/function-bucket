<template>
    <div :style="containerStyle" :class="`flex flex-col rounded grow-1`">
      <div class="flex text-xs">
        {{ uow.data.type }} - {{ containerStyle }}
      </div>
    </div>
</template>

<script lang="ts" setup>
import { useHandleConnections, useNodesData, type NodeProps } from '@vue-flow/core'

const props = defineProps<{
  uow: NodeProps<Uow>
}>()

const containerStyle = computed(() => {
  return `width: ${props.uow.data.width}px; height: ${props.uow.data.height}px; background-color: purple;`
})

const emit = defineEmits<{
  (e: 'expand', id: string): void
}>()

const onExpand = () => {
  emit('expand', props.uow.id)
}
</script>

