<template>
  <ClientOnly>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col md:flex-row">
        <div class="flex flex-col">
          <Myself />
        </div>
        <div class="flex">
          <MyResidents/>
        </div>
      </div>
      <div class="hidden md:flex md:flex-col md:flex-row">
        <UCard>
          <template #header>
            CURRENT PROFILE CLAIMS
          </template>
          <div class="flex">
            <pre class="text-xs flex max-w-lg flex-wrap">{{ currentProfileClaims }}</pre>
          </div>
        </UCard>
        <UCard>
          <template #header>
            AVAILABLE MODULES
          </template>
          <div class="flex">
            <pre class="text-xs flex max-w-lg flex-wrap">{{ availableModules }}</pre>
          </div>
        </UCard>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const currentProfileClaims = await useCurrentProfileClaims()
  const availableModules = await useAvailableModules()
</script>
