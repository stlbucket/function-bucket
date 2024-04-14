
<template>
  <UCard :ui="{
    base: `overflow-hidden grow items-start`
  }">
    <div class="flex grow p-0 justify-between md:px-2 md:py-3 dark:bg-gray-700">
      <UButton 
        icon="i-heroicons-bars-4"
        size="xs"
        color="white" 
        square 
        variant="solid" 
        :title="`${navCollapsed ? 'Expand Menu' : 'Collapse Menu'}`"
        @click="onToggleCollapsed"
      />
      <div class="hidden md:flex text-xl hover:bg-sky-700 focus:cursor-pointer" @click="navigateTo('/')">SupaNuxtPhile</div>
      <div class="flex gap-3">
        <Auth />
        <ColorMode />
      </div>
    </div>
    <DemoInfo />
  </UCard>
</template>

<script lang="ts" setup>
  const appStateStore = useAppStateStore()

  const navCollapsed = computed(() => {
    return appStateStore.navCollapsed
  })

  const onToggleCollapsed = async () => {
    appStateStore.toggleNavCollapsed()
  }

  onMounted(() => {
    appStateStore.setScreenWidth(useScreenWidth())
  })

</script>