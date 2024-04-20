<template>
  <ClientOnly>
    <UCard>
      <template #header>
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-2 md:flex-row md:justify-between">
            <div>ADDRESS BOOK</div>
            <div class="flex">
              <UButton @click="onLeave" v-if="abUsers.length">Leave</UButton>
              <UButton @click="onJoin" v-else>Join</UButton>
            </div>
          </div>
        </div>
      </template>
      <div class="hidden md:flex">
        <AddressBookUsersList 
          :ab-users="abUsers"
          @invite="onInvite"
        />
      </div>
      <div class="flex md:hidden">
        <AddressBookUsersListSmall
          :ab-users="abUsers"
          @invite="onInvite"
        />
      </div>
      <template #footer>
        <div class="text-xs flex p-1">If you join the address book, you will be visible to others who have also joined; and they to you.</div>
        <div class="text-xs flex p-1">This is just a helper for finding and inviting other members and could perhaps be refactored to a full application with more advanced features.</div>
        <div class="text-xs flex p-1">You can still invite user via email even if they are not published here.</div>
        <div class="text-xs flex p-1">Only app-admin users can invite other users.</div>
      </template>
    </UCard>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const { data, executeQuery } = await useGetAbListingsQuery()
  const abUsers = ref((data.value?.getAbListings?.nodes) || [])

  const joinAdressBookMutation = await useJoinAddressBookMutation()
  const onJoin = async () => {
    await joinAdressBookMutation.executeMutation({})
    const { data } = await executeQuery({requestPolicy: 'network-only'})
    abUsers.value = (data.value?.getAbListings?.nodes) || []
  }
  const leaveAdressBookMutation = await useLeaveAddressBookMutation()
  const onLeave = async () => {
    await leaveAdressBookMutation.executeMutation({})
    const { data } = await executeQuery({requestPolicy: 'network-only'})
    abUsers.value = (data.value?.getAbListings?.nodes) || []
  }
  const onInvite = async (email: string) => {
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
      alert(`${email} has been invited`)
    }
    await loadData()
  }
</script>
