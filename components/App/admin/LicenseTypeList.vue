<template>
  <UCard>
    <template #header>
      <div class="text-xs">LICENSE TYPES</div>
    </template>
    <UTable
      :rows="licenseTypes"
      :columns="[
        {key: 'issuedCount', label: '# issued'},
        {key: 'key', label: 'Key'},
        {key: 'permissions', label: 'Permissions'},
      ]"
    >
      <template #issuedCount-data="{ row }">
        {{ row.licenses.totalCount }}
      </template>
      <template #permissions-data="{ row }">
        <div class="flex flex-wrap">
          <UBadge class="flex m-1" v-for="p in row.permissions">{{ p.permissionKey }}</UBadge>
        </div>
      </template>
    </UTable>
  </UCard>
</template>


<script lang="ts" setup>
  defineProps<{
    licenseTypes: LicenseType[]
  }>()
</script>
