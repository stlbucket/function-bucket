<template>
  <WfFlow :wf="wf"></WfFlow>
  <pre>{{ wf }}</pre>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    wf: Wf
  }>()
</script>