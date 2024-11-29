<template>
  <UCard>
    <template #header>
      <div class="flex">
        <NuxtLink :to="`/site-admin/wf`">Template</NuxtLink>
      </div>
    </template>
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
      <NuxtLink :to="`/site-admin/wf/${row.identifier}/template`">{{ row.identifier }}</NuxtLink>
    </template>
    <template #status-data="{ row }">
      <NuxtLink :to="`/site-admin/wf/${row.identifier}/instance/${row.id}`">{{ row.status }}</NuxtLink>
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