<template>
  <UVerticalNavigation :links="links" />
</template>

<script lang="ts" setup>
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const appStateStore = useAppStateStore()
  const collapsed = computed(() => {
    return appStateStore.navCollapsed
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