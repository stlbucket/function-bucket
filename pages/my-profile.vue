<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col min-w-[50%]">
        <Myself />
      </div>
      <div class="flex min-w-[50%]">
        <MyResidents/>
      </div>
    </div>
    <UCard>
      <template #header>
        CURRENT PROFILE CLAIMS
      </template>
      <div class="flex">
        <pre class="text-xs flex max-w-lg flex-wrap">{{ JSON.stringify(claims,null,2) }}</pre>
      </div>
    </UCard>
    <!-- <UCard>
      <template #header>
        SUPABASE SESSION
      </template>
      <div class="flex">
        <pre class="text-xs flex max-w-lg flex-wrap">{{ JSON.stringify(supSession,null,2) }}</pre>
      </div>
    </UCard> -->
  </div>
</template>

<script lang="ts" setup>
  const appStateStore = useAppStateStore()
  const claims = ref()

  const loadUser = async () => {
    try{
      const {data, error} = await useCurrentProfileClaimsQuery()
      claims.value = data.value?.currentProfileClaims
    } catch (e) {
      console.log('ERROR', e)
    }
  }
  loadUser()
</script>
