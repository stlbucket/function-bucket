<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <div class="flex flex-col gap-1 pb-3">
          <div class="flex">{{ application.name }}</div>
          <div class="flex text-xs">key: {{ application.key }}</div>
        </div>
        <div>
          <UButton @click="onNewApplication">New Application</UButton>
        </div>
      </div>
      <div class="md:hidden flex flex-col">
        <LicenseTypeListSmall :license-types="application.licenseTypes || []" />
      </div>
      <div class="hidden md:flex">
        <LicenseTypeList :license-types="application.licenseTypes || []" />
      </div>
    </template>
  </UCard>  
</template>

<script lang="ts" setup>
  defineProps<{
    application: Application
  }>()

  const onNewApplication = async () => {
    alert('not implemented')
  }
</script>
