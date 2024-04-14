<template>
  <USlideover
    :modelValue="showNav.all"
    side="left"
    :ui="{
      width: 'w-screen max-w-[300px]'
    }"
    :preventClose="false"
  >
  <UCard
      class="flex grow flex-col"
    >
      <UButton 
        icon="i-heroicons-bars-4"
        size="xs"
        square 
        title="Close Menu"
        @click="onToggleCollapsed"
      />
      <div class="flex flex-col grow">
        <div v-if="showNav.todo">
          <div v-if="showNav.all">Todo</div>
          <TodoNav />
        </div>
        <div v-if="showNav.tools">
          <div v-if="showNav.all">Tools</div>
          <ToolsNav />
        </div>
        <div v-if="showNav.tenantAdmin">
          <div v-if="showNav.all">Admin</div>
          <TenantAdminNav />    
        </div>
        <div v-if="showNav.siteAdmin">
          <div v-if="showNav.all">Site Admin</div>
          <SiteAdminNav />    
        </div>
      </div>
    </UCard>
    <!-- <pre>{{ JSON.stringify(currentProfileClaims,null,2) }}</pre> -->
  </USlideover>
</template>

<script lang="ts" setup>
const appStateStore = useAppStateStore()
const { currentProfileClaims } = storeToRefs(appStateStore)

const showNav = ref({
  all: false,
  todo: false,
  addressBook: false,
  tools: false,
  tenantAdmin: false,
  siteAdmin: false,
})

const load = async () => {
  const claims = currentProfileClaims.value
  showNav.value.tools = claimsHasPermission(claims, 'p:address-book') || claimsHasPermission(claims, 'p:discussions') || claimsHasPermission(claims, 'p:todo')
  showNav.value.siteAdmin = claimsHasPermission(claims, 'p:app-admin-super')
  showNav.value.tenantAdmin = claimsHasPermission(claims, 'p:app-admin')
  showNav.value.todo = claimsHasPermission(claims, 'p:todo')
}
load()

watch(() => currentProfileClaims.value, () => {
  load()
})


const onToggleCollapsed = async () => {
  appStateStore.toggleNavCollapsed()
}

watch(() => appStateStore.navCollapsed, () => showNav.value.all = !appStateStore.navCollapsed)
</script>