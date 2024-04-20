<template>
  <ClientOnly>
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
  </ClientOnly>
</template>

<script lang="ts" setup>
  const allResidentsQuery = useAllResidentsQuery()
  const { data } = await allResidentsQuery.executeQuery()
  const residents = ref((data.value?.residents ?? []) as unknown as Resident[])

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
  }
</script>