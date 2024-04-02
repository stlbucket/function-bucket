<template>
  <UCard>
    <template #header>
      <div class="text-xs">LICENSE TYPES</div>
    </template>
    <UTable
      :rows="sorted"
      :columns="[
        {key: 'issuedCount', label: '# Issued'},
        {key: 'licenseTypeKey', label: 'Key'},
        {key: 'assignmentScope', label: 'Scope'},
        {key: 'expirationInterval', label: 'Expiration'},
        {key: 'permissions', label: 'Permissions'},        
      ]"
    >
      <template #expirationInterval-data="{ row }">
        <UBadge v-if="row.expirationIntervalType === 'NONE'">NONE</UBadge>
        <UBadge v-if="row.expirationIntervalType !== 'NONE' && row.expirationIntervalMultiplier === 0">UNLIMITED</UBadge>
        <UBadge v-if="row.expirationIntervalType !== 'NONE' && row.expirationIntervalMultiplier === 1">{{`${row.expirationIntervalMultiplier} ${row.expirationIntervalType}`}}</UBadge>
        <UBadge v-if="row.expirationIntervalType !== 'NONE' && row.expirationIntervalMultiplier > 1">{{`${row.expirationIntervalMultiplier} ${row.expirationIntervalType}S`}}</UBadge>
      </template>
      <template #assignmentScope-data="{ row }">
        <UBadge>{{ row.licenseType.assignmentScope }}</UBadge>
      </template>
      <template #permissions-data="{ row }">
        <div class="flex flex-wrap">
          <UBadge class="flex m-1" v-for="p in row.licenseType.permissions">{{ p.permissionKey }}</UBadge>
        </div>
      </template>
    </UTable>
    <!-- <pre>{{ licensePackLicenseTypes }}</pre> -->
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
