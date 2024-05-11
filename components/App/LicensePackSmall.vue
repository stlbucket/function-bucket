<template>
  <div class="flex grow">
    <UCard>
      <template #header>
        <div class="flex flex-col grow">
          <p>{{ licensePack.description }}</p>
        </div>
      </template>
        <LicensePackLicenseTypeListSmall :license-pack-license-types="licensePack.licensePackLicenseTypes || []" />
    </UCard>  
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    licensePack: LicensePack
  }>()
</script>
