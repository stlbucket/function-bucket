<template>
  <div class="flex flex-col grow">
    <UCard :ui="{
      header: {
        padding: 'py-4 px-4'
      }
    }">
      <div class="flex justify-center">
        MY WORKSPACES
      </div>
      <ResidentsListSmall
        class="md:hidden"
        title="MY APP USER TENANCIES" 
        :residents="residents"
        row-action-name="Work Here"
        disable-sort
        show-display-name
        show-email
        @row-action="assumeResidency"
      />
      <ResidentsList
        class="max-sm:hidden"
        title="MY APP USER TENANCIES" 
        row-action-name="Work Here"
        :residents="residents"
        disable-sort
        show-licenses
        show-assume
        @assume="assumeResidency"
      >
      </ResidentsList>
    </UCard>
  </div>
  <!-- <UModal v-model="showModal">
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
  </UModal> -->
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    navToOnAssume?: string
  }>(), {
    navToOnAssume: '/'
  })
  const route = useRoute()
  const tenantNameBounce = ref(false);
  const currentProfileClaims = await useCurrentProfileClaims()
  // const activeResidency = await useActiveResidency()

  const assumeResidentMutation = useAssumeResidentMutation()
  const declineResidencyMutation = useDeclineResidentMutation()
  const { data: profileData, executeQuery: profileQuery } = await useMyProfileResidenciesQuery()

  type CurrentResidencyStatus = 'INVITED' | 'ACTIVE' | 'INACTIVE' | 'UNINVITED'
  const residents: Ref<Resident[]> = ref([])
  const currentResidencyStatus: Ref<CurrentResidencyStatus> = ref('UNINVITED')
  // const showModal = ref(false)

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

    // showModal.value = (['INVITED', 'INACTIVE'].indexOf(currentResidencyStatus.value) > -1) && !supportingResidency
  }
  await loadData()

  const assumeResidency = async (row: Resident) => {
    const { data, error } = await assumeResidentMutation.executeMutation({
      residentId: row.id
    })
    if (error) alert(error.toString())
    // showModal.value = false
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
    // showModal.value = false
    await refreshCurrentProfileClaims()
    // await refreshAvailableModules()
    loadData()
  }

  const onBeginChange = async () => {
    const { data } = await profileQuery({requestPolicy: 'network-only'})
    residents.value = (data.value?.myProfileResidenciesList || []) as unknown as Resident[]
    // showModal.value = true
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