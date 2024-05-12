<template>
  <div class="flex flex-col">
    <UCard :ui="{
      header: {
        padding: 'py-4 px-4'
      }
    }">
      <div class="flex justify-center p-3 gap-3 md:hidden">
        <div>CURRENT WORKSPACE:</div><div>{{ currentProfileClaims.tenantName }}</div>
      </div>
      <ResidentsListSmall
        class="md:hidden"
        title="MY APP USER TENANCIES" 
        :residents="residents"
        row-action-name="Work Here"
        disable-sort
        show-display-name
        show-email
        show-tenant-name
        @row-action="assumeResidency"
      />
      <div class="flex justify-center text-2xl p-3 gap-10 max-sm:hidden">
        <div>CURRENT WORKSPACE:</div><div>{{ currentProfileClaims.tenantName }}</div>
      </div>
      <ResidentsList
        class="max-sm:hidden"
        title="MY APP USER TENANCIES" 
        row-action-name="Work Here"
        :residents="residents"
        disable-sort
        show-licenses
        show-assume
        show-tenant-name
        @assume="assumeResidency"
      >
      </ResidentsList>
    </UCard>
  </div>
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