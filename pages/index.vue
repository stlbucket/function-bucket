<template>
  <div class="flex justify-center items-center h-full bg-gray-700" v-if="showLoginManager">
    <LoginManager></LoginManager>
  </div>
  <div class="flex flex-col justify-start h-full bg-gray-700" v-if="currentProfileClaims.applicationKey === 'base'">
    <HomePageDefault />
  </div>
  <div class="flex flex-col justify-start h-full bg-gray-700" v-if="currentProfileClaims.applicationKey === 'my-app'">
    <HomePageMyApp />
  </div>
  <div class="flex flex-col justify-start h-full bg-gray-700" v-if="!currentProfileClaims.applicationKey && !showLoginManager">
    <MyWorkspaces />
  </div>
</template>

<script lang="ts" setup>
  const currentProfileClaims: Ref<any> = await useCurrentProfileClaims()

  const showLoginManager = computed(() => {
    return currentProfileClaims.value.profileStatus !== 'ACTIVE'
  })
</script>
