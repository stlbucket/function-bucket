<template>
  <div>
    <div v-if="!hideTitle">{{ module.name }}</div>
    <UVerticalNavigation 
    :links="links"
  />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    module: Module,
    hideTitle?: false
  }>()

  const links = computed(() => {
    return props.module.tools.map(t => {
      return {
        label: t.name,
        icon: t.defaultIconKey,
        to: { path: t.route },
        title: t.name
      }
    })
  })
</script>