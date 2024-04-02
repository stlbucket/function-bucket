<template>
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
</template>

<script lang="ts" setup>
  const supabase = useSupabaseClient()
  const user = ref()
  const abUsers = ref([])
  const loadData = async () => {
    const result = await GqlGetAbListings()
    abUsers.value = result.getAbListings.nodes
    user.value = (await supabase.auth.getUser()).data.user
  }
  loadData()

  const onJoin = async () => {
    const result = await GqlJoinAddressBook()
    await loadData()
  }
  const onLeave = async () => {
    const result = await GqlLeaveAddressBook()
    await loadData()
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
