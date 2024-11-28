<template>
  <UCard>
    <template #header>WF Templates</template>
    <UTable
      :rows="wfInstances"
      :columns="[
        {key: 'identifier', label: 'Identifier'},
        {key: 'name', label: 'Name'},
        {key: 'description', label: 'Description'},
        {key: 'status', label: 'Status'},
      ]"
    >
    <template #identifier-data="{ row }">
      <NuxtLink :to="`/site-admin/wf/instance/${row.id}`">{{ row.identifier }}</NuxtLink>
    </template>
    </UTable> 
  </UCard>
</template>

<script lang="ts" setup>
import { useAllWfInstancesQuery } from '~/graphql/api';

  const { data } = await useAllWfInstancesQuery({
    variables: {}
  })
  const wfInstances: Ref<Wf[]> = ref((data.value?.wfInstances || []) as unknown as Wf[])
  const selectedWf = ref(wfInstances.value[0])

  const onSelectWf = async (wf: Wf) => {
    selectedWf.value = wf
  }

</script>