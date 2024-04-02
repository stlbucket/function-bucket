<template>
  <UVerticalNavigation 
    :links="links"
    
  />
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
        label: 'Word Battle Admin',
        icon: 'i-heroicons-academic-cap',
        to: '/werdz',
        title: 'Word Battle',
        // permissionKey: ['p:werdz-admin']
      }
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