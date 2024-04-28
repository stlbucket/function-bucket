<template>
  <USlideover
    :modelValue="showNav"
    side="left"
    :ui="{
      width: 'w-screen max-w-[300px]'
    }"
    :preventClose="true"
  >
  <UCard
      class="flex grow flex-col"
    >
      <UButton 
        icon="heroicons:x-mark-solid"
        square
        color="red"
        title="Close Menu"
        @click="onToggleCollapsed"
      />
      <div class="flex flex-col grow">
        <div class="flex grow-1 bg-blue-400 h-1 mt-3 mb-2"></div>
        <div v-for="m in allModules" :key="m.key">
          <ModuleNav :module="m"></ModuleNav>
        </div>
      </div>
    </UCard>
  </USlideover>
</template>

<script lang="ts" setup>
const appStateStore = useAppStateStore()
const availableModules = await useAvailableModules()
const showNav = ref(false)

const onToggleCollapsed = async () => {
  appStateStore.toggleNavCollapsed()
}

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [showNav],
    handler: () => { appStateStore.navCollapsed = true }
  }
})

watch(() => appStateStore.navCollapsed, () => showNav.value = !appStateStore.navCollapsed)

const enableDevTools = computed(() => useRuntimeConfig())

const extraModules = ref([
  {
    disabled: !enableDevTools.value,
    key: 'dev-tools',
    name: 'Dev Tools',
    defaultIconKey: 'heroicons:wrench-screwdriver-16-solid',
    ordinal: 0,
    toolsByModuleKeyList: [
      {
        key: 'throw-error',
        name: 'Throw Error',
        defaultIconKey: 'heroicons:hand-thumb-down-16-solid',
        ordinal: 0,
        route: '/dev-tools',
      }
    ]
  }
])

const allModules = computed(() => {
  return [
    ...availableModules.value,
    ...extraModules.value.filter(m => !m.disabled)]
    .sort((a,b) => a.ordinal > b.ordinal ? -1 : 1) as unknown as Module[]
})
</script>