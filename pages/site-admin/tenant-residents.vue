<template>
  <ClientOnly>
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
          <UInput v-model="variables.searchTerm" data-1p-ignore />
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
            @row-action="onSupport"
            show-support
          />
        </div>  
      </div>
    </UCard>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const appStateStore = useAppStateStore()
  const variables = reactive({
    searchTerm: ''
  })
  const { data, executeQuery } = await useSearchResidentsQuery({
    variables: variables
  })
  const residents = ref((data.value?.searchResidents?.nodes || []) as unknown as Resident[])
  watch(()=>variables.searchTerm, async () => {
    const { data } = await executeQuery({ requestPolicy: 'network-only'})
    residents.value = (data.value?.searchResidents?.nodes || []) as unknown as Resident[]
  })

  const becomeSupportMutation = useBecomeSupportMutation()
  const onSupport = async (resident: Resident) => {
    await becomeSupportMutation.executeMutation({
      tenantId: resident.tenantId
    })
    await supabase.auth.refreshSession()
    await refreshCurrentProfileClaims()
    // await refreshAvailableModules()
    navigateTo(`/admin/app-tenant-residencies/${resident.id}`)
  }
</script>