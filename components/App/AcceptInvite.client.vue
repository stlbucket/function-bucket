<template>
  <UCard>
    <template #header>
      FRAGMENT TOKENS
    </template>
    <div class="flex" client-only>
      <pre class="text-xs flex max-w-lg flex-wrap">{{ tokens }}</pre>
    </div>
  </UCard>
  <UCard>
    <template #header>
      RESIDENCIES
    </template>
    <div class="flex" client-only>
      <pre class="text-xs flex max-w-lg flex-wrap">{{ JSON.stringify(residencies,null,2) }}</pre>
    </div>
  </UCard>
  <UCard>
    <template #header>
      CURRENT PROFILE CLAIMS
    </template>
    <div class="flex">
      <pre class="text-xs flex max-w-lg flex-wrap">{{ JSON.stringify(currentProfileClaims,null,2) }}</pre>
    </div>
  </UCard>
  <UCard>
    <template #header>
      SUPABASE SESSION
    </template>
    <div class="flex" client-only>
      <pre class="text-xs flex max-w-lg flex-wrap">{{ supSession }}</pre>
    </div>
  </UCard>
  <UModal v-model="showModal">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex justify-center">
          Accept Invitation
        </div>
      </template>
      <div class="flex flex-col gap-3">
        <ResidentsList
          title="Select Residency" 
          :residents="residencies"
          :show-assume="true"
          :show-decline="true"
          @assume="assumeResidency"
          @decline="declineResidency"
          disable-sort
        >
        </ResidentsList>
      </div>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
  const appStateStore = useAppStateStore()
  const supabase = useSupabaseClient()
  const supUser = ref()
  const supSession = ref()
  const showModal = ref(false)
  const tokens = ref()

  const { currentProfileClaims } = storeToRefs(appStateStore)

  const { data } = await useMyProfileResidenciesQuery()
  const residencies = ref((data.value?.myProfileResidenciesList || []) as unknown as Resident[])

  const parseTokens = async () => {
    const fragment = `${window.location}`.split('#').at(1) || ''
    tokens.value = fragment.split('&').reduce(
      (a, f) => {
        const split = f.split('=')
        const key: string = String(split.at(0))
        const value: string = String(split.at(1))
        return {
          ...a,
          [key]: value
        }
      }, {})
  }

  const sendPasswordChange = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(currentProfileClaims.value.email, {
      redirectTo: `${window.origin}/change-password`,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email inbox to complete password reset!')
    }
  }

  const loadSession = async () => {
    const refresh_token = tokens.value.refresh_token || ''
      const { data, error } = await supabase.auth.refreshSession({ refresh_token })
      await refreshCurrentProfileClaims()
      const { session, user } = data
      supSession.value = session
      supUser.value = user
  }

  const loadUser = async () => {
    try{
      await parseTokens()
      await loadSession()
      showModal.value = true

    } catch (e) {
      console.log('ERROR', e)
    }
  }
  loadUser()

  const assumeResidentMutation = await useAssumeResidentMutation()
  const assumeResidency = async (row: Resident) => {
    const { data, error } = await assumeResidentMutation.executeMutation({
      residentId: row.id
    })
    if (error) alert(error.toString())

    await supabase.auth.refreshSession()
    await refreshCurrentProfileClaims()
    await refreshAvailableModules()
    navigateTo('./change-password')
  }

  const declineResidentMutation = await useDeclineResidentMutation()
  const declineResidency = async (row: Resident) => {
    const { data, error } = await declineResidentMutation.executeMutation({
      residentId: row.id
    })
    if (error) alert(error.toString())

    await refreshCurrentProfileClaims()
    await refreshAvailableModules()
    navigateTo('./logout')
  }

</script>
