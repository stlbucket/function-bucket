<template>
  <div :style="containerStyle" :class="`flex flex-col p-1 rounded grow-1 bg-cyan-900`">
    <div class="flex text-xs p-1">
      {{ uow.data.type }} - {{ uow.data.name }}
    </div>
    <div v-if="uow.data.status === 'COMPLETE'" :class="`flex p-1 justify-between bg-green-500`" style="font-size: xx-small;">
      <div class="flex">{{ formatDate(new Date(uow.data.updatedAt)) }}</div>
      <div class="flex">{{ uow.data.status }}</div>
    </div>
    <div v-if="uow.data.status === 'ERROR'" :class="`flex p-1 justify-between bg-red-500`" style="font-size: xx-small;">
      <div class="flex">{{ formatDate(new Date(uow.data.updatedAt)) }}</div>
      <div class="flex">{{ uow.data.status }}</div>
    </div>
    <div v-if="['COMPLETE', 'ERROR'].indexOf(uow.data.status) === -1" :class="`flex p-1 justify-between bg-gray-500`" style="font-size: xx-small;">
      <div class="flex">{{ formatDate(new Date(uow.data.updatedAt)) }}</div>
      <div class="flex">{{ uow.data.status }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useHandleConnections, useNodesData, type NodeProps } from '@vue-flow/core'

const props = defineProps<{
uow: NodeProps<Uow>
}>()

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
  return `width: ${props.uow.data.width}px; height: ${props.uow.data.height}px;`
})

const emit = defineEmits<{
(e: 'expand', id: string): void
}>()

const onExpand = () => {
emit('expand', props.uow.id)
}
</script>

