<template>
  <div>
    <div v-if="!hideTitle">{{ module.name }}</div>
    <UVerticalNavigation 
    :links="links"
  />
  </div>
</template>

<script setup lang="ts">
  import type { Module } from "@/graphql/api"
  const props = defineProps<{
    module: Module,
    hideTitle?: false
  }>()

  const links = computed(() => {
    return props.module.toolsByModuleKeyList.map(t => {
      return {
        label: t.name,
        icon: t.defaultIconKey,
        to: t.route,
        title: t.name
      }
    })
  })
</script>