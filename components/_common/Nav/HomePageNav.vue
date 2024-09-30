<template>
  <UCard>
    <template #header>
      <div class="flex justify-center">Available Modules</div>
      <div class="flex justify-center text-xs">Also accessible via the upper-left menu button</div>
    </template>
      <div class="flex gap-3 flex-wrap">
        <div class="flex bg-blue-400 h-1 mt-3 mb-2"></div>
        <div v-for="m in allModules" :key="m.key">
          <UCard>
            <template #header>
              <div class=""><UIcon v-if="m.defaultIconKey" :name="m.defaultIconKey"></UIcon></div>
              <div class="p-1">{{ m.name }}</div>
            </template>
            <ModuleNav :module="m" hide-title></ModuleNav>
          </UCard>
        </div>
      </div>
    </UCard>
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