<template>
  <UCard>
    <template #header>WF Template</template>
    <WfTemplate :wf="wfTemplate"></WfTemplate>
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
  const wfTemplate = ref(data.value?.wf as Wf)

</script>