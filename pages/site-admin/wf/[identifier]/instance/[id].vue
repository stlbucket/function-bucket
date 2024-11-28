<template>
  <UCard>
    <template #header>
      <div class="flex justify-around">
        <div class="flex">WF Instance</div>
        <div class="flex">
          <!-- <NuxtLink :to="`/site-admin/wf/template/${wfInstance.}`">WF Template</NuxtLink> -->
        </div>
      </div>
    </template>
    <WfFlow :wf="wfInstance"></WfFlow>
  </UCard>
</template>

<script lang="ts" setup>
import { useWfByIdQuery } from '~/graphql/api';

  const route = useRoute()
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

  // setInterval(async () => {
  //   console.log('yo', Date.now())
  //   const { data } = await executeQuery({
  //     requestPolicy: 'network-only'
  //   })
  //   wfInstance.value = data.value?.wf as Wf
  // }, 2000)

</script>