<template>
  <div class="flex justify-center items-center h-full bg-gray-700" v-if="showLoginManager">
    <LoginManager></LoginManager>
  </div>
  <div class="flex flex-col justify-center h-full bg-gray-700" v-else>
    <UserHome />
  </div>
</template>

<script lang="ts" setup>
  const currentProfileClaims = await useCurrentProfileClaims()

  const showLoginManager = computed(() => {
    return currentProfileClaims.value.profileStatus !== 'ACTIVE'
  })
</script>
