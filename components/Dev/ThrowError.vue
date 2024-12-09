<template>
  <UCard>
    <template #header>
      <div class="flex justify-center text-2xl p-2">Raise example exception</div>
      <p class="flex justify-center flex-wrap">This utility calls the graphql api, which will return the given error message.  You will see an alert from the urql mapExchange.</p>
    </template>
      <UInput v-model="variables.message" placeholder="...custom error message..."></UInput>
      <div class="flex justify-between flex-wrap">
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
          <p class="flex flex-wrap">{{ error }}</p>
        </UCard>
      </div>
    <template #footer>
      <UButton @click="onRaiseException">Throw Error</UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
  import { useRaiseExceptionQuery } from '~/graphql/api';

  const variables = reactive({
    message: undefined
  })
  const pause = ref(true)
  const { data, error, executeQuery } = useRaiseExceptionQuery({
    variables: variables,
    pause: pause.value
  })
  const onRaiseException = async () => {
    pause.value = false
    await executeQuery({requestPolicy: 'network-only'})
    pause.value = true
  }
</script>