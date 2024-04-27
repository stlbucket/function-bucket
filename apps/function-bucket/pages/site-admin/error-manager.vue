<template>
  <div class="flex bg-violet-400">
    <UInput v-model="message"></UInput>
    <UButton @click="onThrowError">Throw Error</UButton>
  </div>
</template>

<script lang="ts" setup>
  const message = ref()

  const onThrowError = async () => {
    const result = GqlThrowError({
      message: message.value
    })
  }
</script>