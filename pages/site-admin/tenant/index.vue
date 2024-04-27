<template>
  <ClientOnly>
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
          <UInput v-model="variables.searchTerm" data-1p-ignore />
        </div>
      </div>
      <div class="hidden md:flex">
        <TenantList :tenants="tenants" @support="onSupport"/>
      </div>
      <div class="flex md:hidden">
        <TenantListSmall :tenants="tenants" @support="onSupport"/>
      </div>
    </UCard>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const appStateStore = useAppStateStore()
  const tenants: Ref<Tenant[]> = ref([])
  const variables = reactive({
    searchTerm: ''
  })

  const { data, executeQuery } = await useSearchTenantsQuery({
    variables: variables
  })
  tenants.value = (data.value?.searchTenants?.nodes || []) as unknown as Tenant[]

  watch(()=>variables.searchTerm, async () => {
    const { data } = await executeQuery({ requestPolicy: 'network-only'})
    tenants.value = (data.value?.searchTenants?.nodes || []) as unknown as Tenant[]
  })

  const becomeSupportMutation = await useBecomeSupportMutation()
  const onSupport = async (tenant: Tenant) => {
    await becomeSupportMutation.executeMutation({
      tenantId: tenant.id
    })
    await supabase.auth.refreshSession()
    await refreshCurrentProfileClaims()
    await refreshAvailableModules()
    navigateTo('/admin/app-tenant-residencies')
  }

  const onNewTenant = async (createTenantInput: any) => {
    alert ('NOT IMPLEMENTED')
    // const url = `/api/create-tenant`
    // const { data, pending, error, refresh } = await useFetch(url, {
    //   method: 'POST',
    //   body: createTenantInput
    // })

    // if (error.value) {
    //   alert(error.value.data.message)
    // } else {
    //   await loadData()
    // }
  }
</script>
