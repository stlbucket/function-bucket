<template>
  <ClientOnly>
    <div class="flex flex-col gap-2">
      <MyResidents/>
      <Myself />
      <div class="max-sm:hidden">
        <CurrentProfileClaims />
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const currentProfileClaims = await useCurrentProfileClaims()
  const availableModules = await useAvailableModules()
</script>
