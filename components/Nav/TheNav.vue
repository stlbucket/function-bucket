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
        <div v-if="showNav.siteAdmin">
          <div v-if="showNav.all">Dev</div>
          <DevNav />  
        </div>
      </div>
    </UCard>
    <pre>{{ JSON.stringify(showNav,null,2) }}</pre>
  </USlideover>
</template>

<script lang="ts" setup>
const appStateStore = useAppStateStore()
const { currentProfileClaims } = storeToRefs(appStateStore)
const claims = ref()

const showNav = ref({
  all: false,
  todo: false,
  addressBook: false,
  tools: false,
  tenantAdmin: false,
  siteAdmin: false
})

const load = async () => {
  const {data, error} = await useCurrentProfileClaimsQuery()
  claims.value = data.value?.currentProfileClaims
  showNav.value.tools = claimsHasPermission(claims.value, 'p:address-book') || claimsHasPermission(claims.value, 'p:discussions') || claimsHasPermission(claims.value, 'p:todo')
  showNav.value.siteAdmin = claimsHasPermission(claims.value, 'p:app-admin-super')
  showNav.value.tenantAdmin = claimsHasPermission(claims.value, 'p:app-admin')
  showNav.value.todo = claimsHasPermission(claims.value, 'p:todo')
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