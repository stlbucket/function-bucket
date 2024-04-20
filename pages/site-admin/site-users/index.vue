<template>
  <ClientOnly>
    <UCard>
      <template #header>
        <div class="flex justify-between">
          <div class="flex text-2xl">SITE USERS</div>
          <div class="flex text-xs">Users who have actually joined the system - not including invitees</div>
        </div>
      </template>
      <div class="flex flex-col grow">
        <div>
          <UInput v-model="variables.searchTerm" data-1p-ignore />
        </div>
        <div class="hidden md:flex">
          <SiteUsersList :profiles="profiles" />   
        </div>
        <div class="flex md:hidden">
          <SiteUsersListSmall :profiles="profiles" />   
        </div>
      </div>
    </UCard>  
  </ClientOnly>
</template>

<script lang="ts" setup>
  const variables = reactive({
    searchTerm: ''
  })
  const { data, executeQuery } = await useSearchProfilesQuery({
    variables: variables
  })
  const profiles = ref((data.value?.searchProfiles?.nodes || []) as unknown as Resident[])

  watch(()=>variables.searchTerm, async () => {
    const { data } = await executeQuery({
      requestPolicy: 'network-only'
    })
    profiles.value = (data.value?.searchProfiles?.nodes || []) as unknown as Resident []
  })
</script>
