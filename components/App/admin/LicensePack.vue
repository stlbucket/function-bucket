<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <div class="flex flex-col basis-1/3">
          <div class="flex-1 text-xs">LICENSE PACK KEY</div>
          <div class="flex-1 text-2xl">{{ licensePack.key }}</div>
        </div>
        <div class="flex flex-col basis-2/3 gap-2">
          <div class="flex-1 text-xs">DESCRIPTION</div>
          <div class="flex text">{{ licensePack.description }}</div>
        </div>
      </div>
    </template>
    <LicensePackLicenseTypeList :license-pack-license-types="licensePack.licensePackLicenseTypes || []" />
  </UCard>  
</template>

<script lang="ts" setup>
  defineProps<{
    licensePack: LicensePack
  }>()
</script>
