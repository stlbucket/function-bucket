<template>
  <div class="flex flex-col grow">
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
            {{ activeResidency ? activeResidency.tenantName : 'NONE' }}
          </div>
          <div>
            <UButton
              :disabled="changeResidencyDisabled"
              @click="showModal = true"
            >Change</UButton>
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
  import { useMutation, useQuery } from '@urql/vue';
  const assumeResidentMutation = useAssumeResidentMutation()
  const declineResidencyMutation = useDeclineResidentMutation()
  const myProfileResidenciesQuery = await useMyProfileResidenciesQuery()

  type CurrentResidencyStatus = 'INVITED' | 'ACTIVE' | 'INACTIVE' | 'UNINVITED'
  const residents: Ref<Resident[]> = ref([])
  const currentResidencyStatus: Ref<CurrentResidencyStatus> = ref('UNINVITED')
  const showModal = ref(false)

  residents.value = (myProfileResidenciesQuery.data.value?.myProfileResidenciesList || []) as unknown as Resident[]

  const loadData = async () => {
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
  loadData()

  const assumeResidency = async (row: Resident) => {
    const { data, error } = await assumeResidentMutation.executeMutation({
      residentId: row.id
    })
    if (error) alert(error.toString())

    reloadNuxtApp({path: '/my-profile', force: true})
  }

  const declineResidency = async (row: Resident) => {
    const { data, error } = await declineResidencyMutation.executeMutation({
      residentId: row.id
    })
    if (error) alert(error.toString())

    reloadNuxtApp({path: '/my-profile', force: true})
  }

  const activeResidency = computed(()=> residents.value.find(r => String(r.status).toLowerCase() === 'active'))
  const assumableResidencies = computed(()=> residents.value.filter(r => ['inactive', 'invited'].indexOf(String(r.status).toLowerCase()) > -1))
  const changeResidencyDisabled = computed(()=> assumableResidencies.value?.length === 0)
  // const changeResidencyDisabled = computed(() => true)
</script>