<template>
  <div class="flex justify-center items-center h-full bg-gray-700" v-if="showLoginManager">
    <LoginManager></LoginManager>
  </div>
  <div v-else>
    <div class="flex">
      <MyWorkspaceSelector />
      <div class="flex flex-col justify-start h-full bg-gray-700" v-if="currentProfileClaims.applicationKey === 'base'">
        <HomePageDefault />
        <HomePageNav />
      </div>
      <div class="flex flex-col justify-start h-full bg-gray-700" v-if="currentProfileClaims.applicationKey === 'my-app'">
        <HomePageMyApp />
        <HomePageNav />
      </div>
      <!-- <div class="flex flex-col justify-start h-full bg-gray-700" v-if="['base', 'my-app'].indexOf(currentProfileClaims.applicationKey) === -1">
        <HomePageNav />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  const currentProfileClaims: Ref<any> = await useCurrentProfileClaims()

  const showLoginManager = computed(() => {
    return currentProfileClaims.value.profileStatus !== 'ACTIVE'
  })
</script>
