<template>
  <UCard>
    <template #header>WF Templates</template>
    <UTable
      :rows="wfTemplates"
      :columns="[
        {key: 'identifier', label: 'Identifier'},
        {key: 'name', label: 'Name'},
        {key: 'description', label: 'Description'},
        {key: 'instanceCount', label: 'Instance Count'}
        ]"
    >
    <template #identifier-data="{ row }">
      <NuxtLink :to="`/site-admin/wf/template/${row.id}`">{{ row.identifier }}</NuxtLink>
    </template>
    <template #identifier-instanceCount="{ row }">
      wtf
      <!-- <NuxtLink :to="`/site-admin/wf/instance`">{{ row.instanceCount }} instances</NuxtLink> -->
    </template>
    </UTable> 
  </UCard>
</template>

<script lang="ts" setup>
  const { data } = await useAllWfTemplatesQuery({
    variables: {}
  })
  const wfTemplates: Ref<Wf[]> = ref((data.value?.wfTemplates || []) as unknown as Wf[])
  const selectedWf = ref(wfTemplates.value[0])

  const onSelectWf = async (wf: Wf) => {
    selectedWf.value = wf
  }

</script>