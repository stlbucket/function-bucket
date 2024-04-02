<template>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col min-w-[50%]">
        <!-- <Myself /> -->
      </div>
      <div class="flex min-w-[50%]">
        <!-- <MyResidents/> -->
      </div>
    </div>
    <!-- <UCard>
      <template #header>
        CURRENT PROFILE CLAIMS
      </template>
      <div class="flex">
        <pre class="text-xs flex max-w-lg flex-wrap">{{ JSON.stringify(claims,null,2) }}</pre>
      </div>
    </UCard>
    <UCard>
      <template #header>
        SUPABASE SESSION
      </template>
      <div class="flex" client-only>
        <pre class="text-xs flex max-w-lg flex-wrap">{{ supSession }}</pre>
      </div>
    </UCard> -->
    <AcceptInvite />
  </div>
</template>

<script lang="ts" setup>
  // const appStateStore = useAppStateStore()
  // const supabase = useSupabaseClient()
  // // const supUser = ref()
  // const supSession = ref()
  // const claims = ref()
  // const route = useRoute();

  // const loadUser = async () => {
  //   try{
  //     const { data, error } = await supabase.auth.getSession()
  //     // supUser.value = data.session?.user
  //     supSession.value = data.session //? { ...data.session, access_token: 'REMOVED'} : null
  //     claims.value = await appStateStore.getCurrentProfileClaims()
  //   } catch (e) {
  //     console.log('ERROR', e)
  //   }
  // }
  // loadUser()

  // const url = computed(() => {
  //   return `${window.location}`
  // })
  // const accessToken = computed(() => {

  //   const fragment = window.origin.split('#').at(1) || ''
  //   return fragment.split('&').reduce(f => {
  //     const split = f.split('=')
  //     return {
  //       [split.at(0)]: split.at(1)
  //     }
  //   })
  // })
</script>
