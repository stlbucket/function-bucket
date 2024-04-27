<template>
  <div class="flex flex-col gap-2" v-if="mode === 'login'">
    <Login></Login>
    <a @click="mode = 'reset'" class="hover:cursor-pointer underline text-blue-400">Forgot my password.</a>
  </div>
  <div class="flex flex-col gap-2" v-if="mode === 'reset'">
    <ResetPassword></ResetPassword>
    <a @click="mode = 'login'" class="hover:cursor-pointer underline text-blue-400">Back to login.</a>
  </div>
</template>

<script lang="ts" setup>
  type LoginManagerMode = 'login' | 'reset'
  const mode: Ref<LoginManagerMode> = ref('login')
</script>
