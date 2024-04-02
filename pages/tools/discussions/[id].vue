<template>
  <MsgTopic v-if="topicId" :topicId="topicId" />
</template>

<script lang="ts" setup>
  const route = useRoute()
  const topicId = computed(()=>{
    return route.params.id
  })
</script>
