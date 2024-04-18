<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <div class="flex text-2xl">APP USERS</div>
        <div class="flex text-xs">Invitees may not yet be app users</div>
      </div>
      <ResidentModal @new-resident="onNewResident"/>
    </template>
    <div class="hidden md:flex">
      <ResidentsList 
        :residents="residents"
        show-display-name
        show-email
      />
    </div>
      <div class="flex md:hidden">
        <ResidentsListSmall
        :residents="residents"
        show-display-name
        show-email
      />
    </div>
  </UCard>
</template>

<script lang="ts" setup>
  const residents: Ref<any[]> = ref([])
  const allResidentsQuery = useAllResidentsQuery()

  const loadData = async () => {
    const { data } = await allResidentsQuery.executeQuery()
    residents.value = data.value?.residents || []
  }
  loadData()

  const onNewResident = async (email: string) => {

    const url = `/api/invite-user`
    const { data, pending, error, refresh } = await useFetch(url, {
      method: 'POST',
      body: {
        email: email,
        redirectTo: `${window.origin}/accept-invite`
      }
    })

    if (error.value) {
      alert(error.value.data.message)
    } else {
      alert(`${data.value?.resident?.email} has been invited`)
    }

    // const result = await GqlInviteUser({
    //   email: email
    // })
    // navigateTo(`/admin/app-tenant-residencies/${result.inviteUser.resident.id}`)
  }
</script>