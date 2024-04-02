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
  const residents = ref([])

  const loadData = async () => {
    // const { data, error, pending, refresh } = await useAsyncGql({
    //   operation: 'AllResidents'
    // })

    // if (error.value) {
    //   console.error(error)
    // }

    // console.log(data.value)

    const result = await GqlAllResidents()
    residents.value = result.residents || []
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