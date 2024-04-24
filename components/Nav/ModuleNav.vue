<template>
  <div>
    <div v-if="!hideTitle" class="flex gap-2 items-center">
      <div class=""><UIcon v-if="module.defaultIconKey" :name="module.defaultIconKey"></UIcon></div>
      <div class="p-1">{{ module.name }}</div>
    </div>
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