
<template>
  <UCard :ui="{
    base: `overflow-hidden grow items-start`
  }">
    <div class="flex grow p-0 justify-between md:px-2 md:py-3 dark:bg-gray-700 gap-1">
      <div class="flex grow gap-1">
        <div :class="`${currentProfileClaims.displayName ? '' : 'invisible'}`">
          <UButton 
            icon="i-heroicons-bars-4"
            color="white" 
            square 
            variant="solid" 
            :title="`${navCollapsed ? 'Expand Menu' : 'Collapse Menu'}`"
            @click="onToggleCollapsed"
          />
        </div>
        <!-- <NuxtLink to="/"><UIcon name="solar:home-linear" class="w-6 h-6 hover:text-blue-600" @click="navigateTo('/')"></UIcon></NuxtLink> -->
        <div :class="` flex grow p-1 dark:bg-gray-800 hover:bg-gray-600 ${tenantNameBounce ? 'animate-ping bg-gray-800' : ''}`">
          {{ currentProfileClaims.tenantName }}
        </div>
      </div>
      <div class="flex gap-1">
        <Auth />
        <ColorMode />
      </div>
    </div>
    <div class="flex max-sm:hidden">
      <DemoInfo />
    </div>
  </UCard>
</template>

<script lang="ts" setup>
  const appStateStore = useAppStateStore()
  const currentProfileClaims: Ref<any> = await useCurrentProfileClaims()
  const tenantNameBounce = ref(false);

  const navCollapsed = computed(() => {
    return appStateStore.navCollapsed
  })

  const onToggleCollapsed = async () => {
    appStateStore.toggleNavCollapsed()
  }

  onMounted(() => {
    appStateStore.setScreenWidth(useScreenWidth())
  })

  watch (() => currentProfileClaims.value.tenantName, () => {
    tenantNameBounce.value = true
    setTimeout(() => { tenantNameBounce.value = false }, 700)
  })
</script>