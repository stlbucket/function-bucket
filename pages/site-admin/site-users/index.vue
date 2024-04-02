<template>
  <UCard>
    <template #header>
      <div class="flex justify-between">
        <div class="flex text-2xl">SITE USERS</div>
        <div class="flex text-xs">Users who have actually joined the system - not including invitees</div>
      </div>
    </template>
    <div class="flex flex-col grow">
      <div>
        <UInput v-model="searchTerm" data-1p-ignore />
      </div>
      <div class="hidden md:flex">
        <SiteUsersList :profiles="profiles" />   
      </div>
      <div class="flex md:hidden">
        <SiteUsersListSmall :profiles="profiles" />   
      </div>
    </div>
  </UCard>  
</template>

<script lang="ts" setup>
  const profiles = ref([])
  const searchTerm = ref()
  const loadData = async () => {
    const result = await GqlSearchProfiles({
      searchTerm: searchTerm.value
    })
    profiles.value = result.searchProfiles.nodes
  }
  loadData()
  watch(()=>searchTerm.value, loadData)
</script>
