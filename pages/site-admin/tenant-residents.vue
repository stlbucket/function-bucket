<template>
    <UCard
      class="flex flex-col grow"
    >
      <template #header>
        <div class="flex justify-between">
          <div class="flex text-2xl">RESIDENT SUPPORT</div>
        </div>
      </template>
      <div class="flex flex-col grow">
        <div class="flex flex-col">
          <div class="text-xs">SEARCH TERM</div>
          <UInput v-model="searchTerm" data-1p-ignore />
        </div>
        <div class="hidden md:flex grow">
          <ResidentsList 
            :residents="residents" 
            row-action-name="Support"
            show-display-name
            show-email
            @support="onSupport"
            show-support
          />
        </div>
        <div class="flex grow md:hidden">
          <ResidentsListSmall
            :residents="residents" 
            row-action-name="Support"
            show-display-name
            show-email
            @support="onSupport"
            show-support
          />
        </div>  
      </div>
    </UCard>
</template>

<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const appStateStore = useAppStateStore()
  const residents = ref([])
  const searchTerm = ref()
  const loadData = async () => {
    const result = await GqlSearchResidents({
      searchTerm: searchTerm.value
    })
    residents.value = result.searchResidents.nodes || []
  }
  loadData()
  watch(()=>searchTerm.value, loadData)

  const onSupport = async (resident: Resident) => {
    const result = await GqlBecomeSupport({
      tenantId: resident.tenantId
    })
    await supabase.auth.refreshSession()
    await appStateStore.getCurrentProfileClaims(true)
    reloadNuxtApp({path: `/admin/app-tenant-residencies/${resident.id}`})

    // const result = await GqlBecomeSupport({
    //   tenantId: resident.tenantId
    // })
    // // console.log(result)
    // await client.auth.refreshSession()
    // reloadNuxtApp({path: `/admin/app-tenant-residencies/${resident.id}`})
  }
</script>