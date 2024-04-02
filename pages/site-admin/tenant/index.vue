<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <div class="text-2xl">TENANT SUPPORT</div>
        <TenantModal @new="onNewTenant"/>
      </div>
    </template>
    <div>
      <div class="flex flex-col">
        <div class="text-xs">SEARCH TERM</div>
        <UInput v-model="searchTerm" data-1p-ignore />
      </div>
    </div>
    <div class="hidden md:flex">
      <TenantList :tenants="tenants" @support="onSupport"/>
    </div>
    <div class="flex md:hidden">
      <TenantListSmall :tenants="tenants" @support="onSupport"/>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const appStateStore = useAppStateStore()
  const tenants = ref([])
  const searchTerm = ref()
  const loadData = async () => {
    const result = await GqlSearchTenants({
      searchTerm: searchTerm.value
    })
    tenants.value = result.searchTenants.nodes
  }
  loadData()
  watch(()=>searchTerm.value, loadData)

  const onSupport = async (tenant: Tenant) => {
    const result = await GqlBecomeSupport({
      tenantId: tenant.id
    })
    await supabase.auth.refreshSession()
    await appStateStore.getCurrentProfileClaims(true)
    reloadNuxtApp({path: '/admin/app-tenant-residencies'})
  }

  const onNewTenant = async (createTenantInput: NewTenantInfo) => {
    const url = `/api/create-tenant`
    const { data, pending, error, refresh } = await useFetch(url, {
      method: 'POST',
      body: createTenantInput
    })

    if (error.value) {
      alert(error.value.data.message)
    } else {
      await loadData()
    }
  }
</script>
