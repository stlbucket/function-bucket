<template>
  <UCard>
    <template #header>
      <div class="flex justify-center text-2xl p-2">Throw example error</div>
      <p class="flex justify-center">This utility calls the graphql api, which will return the given error message.  You will see an alert from the urql mapExchange.</p>
    </template>
      <UInput v-model="variables.message" placeholder="...custom error message..."></UInput>
      <div class="flex justify-between">
        <UCard>
          <template #header>
            Current Data
          </template>
          <pre>{{ data }}</pre>
        </UCard>
        <UCard>
          <template #header>
            Current Error
          </template>
          <pre>{{ error }}</pre>
        </UCard>
      </div>
    <template #footer>
      <UButton @click="onThrowError">Throw Error</UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
  const variables = reactive({
    message: undefined
  })
  const pause = ref(true)
  const { data, error, executeQuery } = useThrowErrorQuery({
    variables: variables,
    pause: pause.value
  })
  const onThrowError = async () => {
    pause.value = false
    await executeQuery({requestPolicy: 'network-only'})
    pause.value = true
  }
</script>