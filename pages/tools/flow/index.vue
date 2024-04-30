
<script setup>
  /* these are necessary styles for vue flow */
  import '@vue-flow/core/dist/style.css';

  /* this contains the default theme, these are optional styles */
  import '@vue-flow/core/dist/theme-default.css';

import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'

const initialNodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    label: 'Node 1',
  },
  {
    id: '2',
    position: { x: 150, y: 50 },
    label: 'Node 2',
  }
])

const { removeNodes } = useVueFlow()

// remove a single node from the graph
function onRemoveNode() {
  removeNodes('1')
}

// remove multiple nodes from the graph
function onRemoveNodes() {
  removeNodes(['1', '2'])
}
</script>

<template>
  <UCard class="flex gap-1">
    <UButton @click="onRemoveNode">Remove a node</UButton>
    <UButton @click="onRemoveNodes">Remove multiple nodes</UButton>
  </UCard>
  <VueFlow :nodes="initialNodes" />
  
</template>