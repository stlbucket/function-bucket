<template>
  <div class="flex flex-col grow">
    <div class="flex justify-center text-2xl p-3">{{ subscription.licensePackKey }}</div>
    <div class="hidden md:flex grow">
      <LicensePack :license-pack="subscription.licensePack" />    
    </div>
    <div class="flex md:hidden grow">
      <LicensePackSmall :license-pack="subscription.licensePack" />    
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    subscription: TenantSubscription
  }>()
</script>