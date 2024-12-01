<template>
  <UCard>
    <template #header>
      <div class="flex justify-around">
        <div class="flex">
          <NuxtLink :to="`/site-admin/wf`">All Templates</NuxtLink>
        </div>
        <div class="flex">
          <NuxtLink :to="`/site-admin/wf/${identifier}/instance`">Workflow Instances</NuxtLink>
        </div>
      </div>
    </template>
    <WfFlow :wf="wfTemplate"></WfFlow>
  </UCard>
</template>

<script lang="ts" setup>
import { useWfTemplateByIdentifierQuery } from '~/graphql/api';

  const route = useRoute()
  const identifier: string = route.params.identifier as string
  const {
    data,
    error,
    executeQuery
  } = await useWfTemplateByIdentifierQuery({
    variables: {
      identifier
    }
  })  
  const wfTemplate = ref(data.value?.wfTemplateByIdentifier as Wf)

</script>