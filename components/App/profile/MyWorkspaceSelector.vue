<template>
  <div class="flex flex-col gap-1 w-1/5 bg-gray-700">
    <div class="flex flex-col justify-center">
      <div class="flex justify-center text-s bg-gray-700">CURRENT</div>
      <div class="flex justify-center text-xs bg-gray-600">{{ activeResidency.tenantName }}</div>
    </div>
    <div class="flex flex-col justify-center" v-if="inactiveResidencies.length">
      <div class="flex justify-center text-s bg-gray-700">INACTIVE</div>
      <div 
        class="flex justify-center text-xs bg-gray-600 hover:bg-blue-600" 
        v-for="ir in inactiveResidencies"
        @click="assumeResidency(ir)"
      >
        {{ ir.tenantName }}
      </div>
    </div>
    <div class="flex flex-col justify-center" v-if="invitedResidencies.length">
      <div class="flex justify-center text-s bg-gray-700">INVITED</div>
      <div 
        class="flex justify-center text-xs bg-gray-600 hover:bg-blue-600" 
        v-for="ir in invitedResidencies"
        @click="assumeResidency(ir)"
      >
        {{ ir.tenantName }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    navToOnAssume?: string,
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
  const activeResidency = ref()
  const inactiveResidencies = ref<Resident[]>([])
  const invitedResidencies = ref<Resident[]>([])

  residents.value = (profileData.value?.myProfileResidenciesList || []) as unknown as Resident[]

  const loadData = async () => {
    const {data: profileData} = await profileQuery()
    residents.value = (profileData.value?.myProfileResidenciesList || []) as unknown as Resident[]
    const supportingResidency = residents.value.find(r => String(r.status).toLowerCase() === 'supporting')
    activeResidency.value = residents.value.find(r => String(r.status).toLowerCase() === 'active')
    inactiveResidencies.value = residents.value.filter(r => String(r.status).toLowerCase() === 'inactive')
    invitedResidencies.value = residents.value.filter(r => String(r.status).toLowerCase() === 'invited')

    const inactiveResidency = residents.value.find(r => String(r.status).toLowerCase() === 'inactive')
    const invitedResidency = residents.value.find(r => String(r.status).toLowerCase() === 'invited')

    if (activeResidency.value) {
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
      // await reloadNuxtApp({
      //   path: '/',
      //   force: true
      // })
      await navigateTo('/bounce')
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