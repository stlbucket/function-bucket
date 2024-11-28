<template>
  <UCard>
    <template #header>
      <div class="flex justify-around">
        <div class="flex">
          <NuxtLink :to="`/site-admin/wf/${wfIdentifier}/instance`">Workflow Instance</NuxtLink>
        </div>
        <div class="flex">
          <NuxtLink :to="`/site-admin/wf/${wfIdentifier}/template`">Template</NuxtLink>
        </div>
        <div class="flex">
          <UButton @click="refresh">UPDATE</UButton>
        </div>
      </div>
    </template>
    <WfFlow :wf="wfInstance"></WfFlow>
  </UCard>
</template>

<script lang="ts" setup>
import { useWfByIdQuery } from '~/graphql/api';

  const route = useRoute()
  const wfIdentifier = route.params.identifier
  const {
    data,
    error,
    executeQuery
  } = await useWfByIdQuery({
    variables: {
      id: route.params.id
    }
  })  
  const wfInstance = ref(data.value?.wf as Wf)

  const refresh = async () => {
    const { data } = await executeQuery({
      requestPolicy: 'network-only'
    })
    wfInstance.value = data.value?.wf as Wf
  }

  const intervalId = ref()

  const beginPolling = () => {
    intervalId.value = setInterval(async () => {
      const { data } = await executeQuery({
        requestPolicy: 'network-only'
      })
      wfInstance.value = data.value?.wf as Wf
      if (wfInstance.value.status === 'COMPLETE') {
        clearInterval(intervalId.value)
      }
    }, 3000)
  }
  beginPolling()
  // watch(() => wfInstance.value, () => {
  //   alert('boom')
  // })
</script>