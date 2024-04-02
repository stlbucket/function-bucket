<template>
  <div class="flex justify-center">{{ subscription.licensePackKey }}</div>
  <div class="hidden md:flex">
    <LicensePack :license-pack="subscription.licensePack" />    
  </div>
  <div class="flex md:hidden">
    <LicensePackSmall :license-pack="subscription.licensePack" />    
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    subscription: TenantSubscription
  }>()
</script>