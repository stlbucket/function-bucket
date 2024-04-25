<template>
  <ModuleNav
    :module="module"
  ></ModuleNav>
</template>

<script lang="ts" setup>
  const module = computed(() => {
    return {
      key: 'dev-tools',
      name: 'Dev Tools',
      permissionKeys: [],
      defaultIconKey: 'heroicons:wrench-screwdriver-20-solid',
      ordinal: 0,
      toolsByModuleKeyList: [
        {
          key: 'throw-error',
          name: 'Throw Error',
          permissionKeys: [],
          defaultIconKey: 'heroicons:hand-thumb-down-16-solid',
          ordinal: 0,
          route: '/dev-tools',
        }
      ],
    } as unknown as Module
  })
</script>