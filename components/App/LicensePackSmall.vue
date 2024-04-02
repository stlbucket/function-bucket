<template>
  <UCard>
    <template #header>
      <div class="flex flex-col wrap">
        <p>{{ licensePack.description }}</p>
      </div>
    </template>
    <LicensePackLicenseTypeListSmall :license-pack-license-types="licensePack.licensePackLicenseTypes || []" />
  </UCard>  
</template>

<script lang="ts" setup>
  defineProps<{
    licensePack: LicensePack
  }>()
</script>
