<template>
  <ClientOnly>
    <div class="flex flex-col gap-2">
      <div class="flex flex-col md:flex-row">
        <div class="flex flex-col min-w-[50%]">
          <Myself />
        </div>
        <div class="flex min-w-[50%]">
          <MyResidents/>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:justify-between">
        <UCard>
          <template #header>
            CURRENT PROFILE CLAIMS
          </template>
          <div class="flex">
            <pre class="text-xs flex max-w-lg flex-wrap">{{ claims }}</pre>
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
      <!-- <UCard>
        <template #header>
          SUPABASE SESSION
        </template>
        <div class="flex">
          <pre class="text-xs flex max-w-lg flex-wrap">{{ JSON.stringify(supSession,null,2) }}</pre>
        </div>
      </UCard> -->
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const appStateStore = useAppStateStore()
  const {data, error} = await useCurrentProfileClaimsQuery()
  const claims = ref(data.value?.currentProfileClaims)

  const {data: modulesData} = await useAvailableModulesQuery()
  const availableModules = ref(modulesData.value?.availableModules || [])

</script>
