<template>
  <div v-if="compact && activeResidency">
    <div :class="`flex gap-1 p-1 bg-gray-800 hover:bg-gray-600 ${tenantNameBounce ? 'animate-bounce bg-gray-800' : ''}`" @click="onBeginChange">
      <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M21.25 8.5c0-1.404 0-2.107-.337-2.611a2 2 0 0 0-.552-.552c-.441-.295-1.034-.332-2.115-.336c.004.291.004.596.004.91V7.25h1a.75.75 0 0 1 0 1.5h-1v1.5h1a.75.75 0 0 1 0 1.5h-1v1.5h1a.75.75 0 0 1 0 1.5h-1v6.5h-1.5V6c0-1.886 0-2.828-.586-3.414C15.578 2 14.636 2 12.75 2h-2c-1.886 0-2.828 0-3.414.586C6.75 3.172 6.75 4.114 6.75 6v15.25h-1.5v-6.5h-1a.75.75 0 0 1 0-1.5h1v-1.5h-1a.75.75 0 0 1 0-1.5h1v-1.5h-1a.75.75 0 0 1 0-1.5h1V5.91c0-.313 0-.618.004-.91c-1.081.005-1.674.042-2.115.337a2 2 0 0 0-.552.552C2.25 6.393 2.25 7.096 2.25 8.5v12.75h-.5a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5h-.5zM9 11.75a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m2.75 3.5a.75.75 0 0 1 .75.75v2.25H11V19a.75.75 0 0 1 .75-.75M9 6.25a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 9 6.25m0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 9 9.25" clip-rule="evenodd"/></svg>
      {{ activeResidency?.tenantName }}
    </div>
  </div>
  <div class="flex flex-col grow" v-if="!compact">
    <UCard :ui="{
      header: {
        padding: 'py-4 px-4'
      }
    }">
      <template #header>
        <div class="flex justify-between">
          <div>
            ACTIVE RESIDENCY
          </div>
          <div>
            <div :class="`flex gap-1 p-1 bg-gray-800 hover:bg-gray-600 ${tenantNameBounce ? 'animate-bounce bg-gray-800' : ''}`" @click="onBeginChange">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M21.25 8.5c0-1.404 0-2.107-.337-2.611a2 2 0 0 0-.552-.552c-.441-.295-1.034-.332-2.115-.336c.004.291.004.596.004.91V7.25h1a.75.75 0 0 1 0 1.5h-1v1.5h1a.75.75 0 0 1 0 1.5h-1v1.5h1a.75.75 0 0 1 0 1.5h-1v6.5h-1.5V6c0-1.886 0-2.828-.586-3.414C15.578 2 14.636 2 12.75 2h-2c-1.886 0-2.828 0-3.414.586C6.75 3.172 6.75 4.114 6.75 6v15.25h-1.5v-6.5h-1a.75.75 0 0 1 0-1.5h1v-1.5h-1a.75.75 0 0 1 0-1.5h1v-1.5h-1a.75.75 0 0 1 0-1.5h1V5.91c0-.313 0-.618.004-.91c-1.081.005-1.674.042-2.115.337a2 2 0 0 0-.552.552C2.25 6.393 2.25 7.096 2.25 8.5v12.75h-.5a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5h-.5zM9 11.75a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75m2.75 3.5a.75.75 0 0 1 .75.75v2.25H11V19a.75.75 0 0 1 .75-.75M9 6.25a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 9 6.25m0 3a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 9 9.25" clip-rule="evenodd"/></svg>
              {{ activeResidency?.tenantName }}
            </div>
          </div>
        </div>
      </template>
      <div class="flex justify-center">
        ALL OF MY RESIDENCIES
      </div>
      <div class="flex">
        <ResidentsList
          title="MY APP USER TENANCIES" 
          :residents="residents"
          row-action-name="Assume"
          disable-sort
          show-licenses
        >
        </ResidentsList>
      </div>
    </UCard>
  </div>
  <UModal v-model="showModal">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800 w-full' }">
      <template #header>
        <div class="flex justify-center">
          Assume Residency
        </div>
      </template>
      <div class="flex flex-col gap-3">
        <ResidentsList
          title="Select Residency" 
          :residents="activeResidency ? [...assumableResidencies, activeResidency] : assumableResidencies"
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
  const props = withDefaults(defineProps<{
    compact?: boolean,
    navToOnAssume?: string
  }>(), {
    compact: false,
    navToOnAssume: '/'
  })
  const route = useRoute()
  const tenantNameBounce = ref(false);
  const currentProfileClaims = await useCurrentProfileClaims()
  const activeResidency = await useActiveResidency()

  const assumeResidentMutation = useAssumeResidentMutation()
  const declineResidencyMutation = useDeclineResidentMutation()
  const { data: profileData, executeQuery: profileQuery } = await useMyProfileResidenciesQuery()

  type CurrentResidencyStatus = 'INVITED' | 'ACTIVE' | 'INACTIVE' | 'UNINVITED'
  const residents: Ref<Resident[]> = ref([])
  const currentResidencyStatus: Ref<CurrentResidencyStatus> = ref('UNINVITED')
  const showModal = ref(false)

  residents.value = (profileData.value?.myProfileResidenciesList || []) as unknown as Resident[]

  const loadData = async () => {
    const {data: profileData} = await profileQuery()
    residents.value = (profileData.value?.myProfileResidenciesList || []) as unknown as Resident[]
    const supportingResidency = residents.value.find(r => String(r.status).toLowerCase() === 'supporting')
    const activeResidency = residents.value.find(r => String(r.status).toLowerCase() === 'active')
    const inactiveResidency = residents.value.find(r => String(r.status).toLowerCase() === 'inactive')
    const invitedResidency = residents.value.find(r => String(r.status).toLowerCase() === 'invited')

    if (activeResidency) {
      currentResidencyStatus.value = 'ACTIVE'
    } else if (inactiveResidency) {
      currentResidencyStatus.value = 'INACTIVE'
    } else if (invitedResidency) {
      currentResidencyStatus.value = 'INVITED'
    } else {
      currentResidencyStatus.value = 'UNINVITED'
    }

    showModal.value = (['INVITED', 'INACTIVE'].indexOf(currentResidencyStatus.value) > -1) && !supportingResidency
  }
  await loadData()

  const assumeResidency = async (row: Resident) => {
    const { data, error } = await assumeResidentMutation.executeMutation({
      residentId: row.id
    })
    if (error) alert(error.toString())
    showModal.value = false
    await refreshCurrentProfileClaims()
    await loadData()
    if (props.navToOnAssume && route.path !== props.navToOnAssume) {
      // await navigateTo('/')
      await reloadNuxtApp({
        path: '/',
        force: true
      })
    } else {
      tenantNameBounce.value = true
      setTimeout(() => { tenantNameBounce.value = false }, 1469)
    }
  }

  const declineResidency = async (row: Resident) => {
    const { data, error } = await declineResidencyMutation.executeMutation({
      residentId: row.id
    })
    if (error) alert(error.toString())
    showModal.value = false
    await refreshCurrentProfileClaims()
    // await refreshAvailableModules()
    loadData()
  }

  const onBeginChange = async () => {
    const { data } = await profileQuery({requestPolicy: 'network-only'})
    residents.value = (data.value?.myProfileResidenciesList || []) as unknown as Resident[]
    showModal.value = true
  }

  // const activeResidency = computed(()=> residents.value.find(r => String(r.status).toLowerCase() === 'active'))
  const assumableResidencies = computed(()=> residents.value.filter(r => ['inactive', 'invited'].indexOf(String(r.status).toLowerCase()) > -1))
  const changeResidencyDisabled = computed(()=> assumableResidencies.value?.length === 0)

  watch (() => currentProfileClaims.value.tenantName, async () => {
    await loadData()
    tenantNameBounce.value = true
    setTimeout(() => { tenantNameBounce.value = false }, 1469)
  })
</script>