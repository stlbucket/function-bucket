<template>
    <UCard>
      <template #header>
        <div class="text-xs">LICENSE TYPES</div>
      </template>
      <div class="flex grow flex-wrap">
        <UCard
          v-for="lt in sorted"
          class="flex flex-col grow"
        >
          <template #header>
            <div class="flex justify-between p-1 rounded grow">
              <div class="flex text-xl">{{ lt.licenseType?.key }}</div>
              <div class="flex">{{ lt.issuedCount }} issued</div>
            </div>
          </template>
          <div class="pt-1 pb-2 px-1">
            <UBadge class="flex m-1" v-for="p in lt.licenseType?.permissions">{{ p.permissionKey }}</UBadge>
          </div>
        </UCard>
      </div>
    </UCard>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    licensePackLicenseTypes: LicensePackLicenseType[]
  }>()

  const sorted = computed(() => {
    return props.licensePackLicenseTypes.sort((a,b) => a.licenseTypeKey < b.licenseTypeKey ? -1 : 1)
  })
</script>
