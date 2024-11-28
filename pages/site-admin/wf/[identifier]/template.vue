<template>
  <UCard>
    <template #header>WF Template</template>
    <WfTemplate :wf="wfTemplate"></WfTemplate>
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