<template>
  <ModuleNav
    :module="module"
  ></ModuleNav>
</template>

<script lang="ts" setup>
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const appStateStore = useAppStateStore()
  const collapsed = computed(() => {
    return appStateStore.navCollapsed
  })

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

  const links = computed(() => {
    return [
      {
        label: 'Dev Tools',
        icon: 'i-heroicons-clipboard-document-list',
        to: '/dev-tools',
        title: 'Dev Tools',
        // permissionKey: ['p:app-admin-super']
      },
    ]
      .map((l: any) => {
        return {
          ...l,
          label: collapsed.value ? '' : l.label
        }
      })
      .filter((l:any) => claimsHasPermission(currentProfileClaims.value, l.permissionKey))
  })
</script>