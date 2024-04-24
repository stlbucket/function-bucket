<template>
  <USlideover
    :modelValue="showNav.all"
    side="left"
    :ui="{
      width: 'w-screen max-w-[300px]'
    }"
    :preventClose="false"
  >
  <UCard
      class="flex grow flex-col"
    >
      <UButton 
        icon="i-heroicons-bars-4"
        size="xs"
        square 
        title="Close Menu"
        @click="onToggleCollapsed"
      />
      <div class="flex flex-col grow">
        <div class="flex grow-1 bg-blue-400 h-1 mt-3 mb-2"></div>
        <div v-for="m in availableModules" :key="m.key">
          <ModuleNav :module="m"></ModuleNav>
        </div>
        <DevNav v-if="enableDevTools"></DevNav>
      </div>
    </UCard>
  </USlideover>
</template>

<script lang="ts" setup>
const appStateStore = useAppStateStore()
const {data: modulesData} = await useAvailableModulesQuery()
const availableModules = ref((modulesData.value?.availableModules || []) as unknown as Module[])
const showNav = ref({ all: false })

const onToggleCollapsed = async () => {
  appStateStore.toggleNavCollapsed()
}

watch(() => appStateStore.navCollapsed, () => showNav.value.all = !appStateStore.navCollapsed)

const enableDevTools = computed(() => useRuntimeConfig())
</script>