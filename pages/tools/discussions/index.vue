<template>
  <UCard>
    <template #header>
      DISCUSSIONS 
    </template>
    <UTable
      :rows="discussions"
      :columns="[
        {key: 'name', label: 'Topic'},
        {key: 'status', label: 'Status'},
        {key: 'messageCount', label: '# Msgs'},
        {key: 'participants', label: 'Participants'}
      ]"
    >
    <template #name-data="{row}">
      <NuxtLink :to="`/tools/discussions/${row.id}`">{{ row.name }}</NuxtLink>
    </template>
    <template #messageCount-data="{row}">
      {{ row.messages.totalCount }}
    </template>
    <template #participants-data="{row}">
      <div :title="participantsText(row).raw">{{ participantsText(row).display }}</div>
    </template>
    </UTable>
  </UCard>
</template>

<script lang="ts" setup>
  const discussions: Ref<any[]> = ref([])

  const loadData = async () => {
    const result = await GqlAllDiscussions()
    discussions.value = result.topics.nodes
  }
  loadData()

  const participantsText = (topic:any) => {
    const raw = `(${topic.subscribers.length}) ${topic.subscribers.map((s: any) => s.msgResident.displayName).join(', ')}`
    return {
      raw: raw,
      display: raw.length > 50 ? `${raw.slice(0,48)}...` : raw
    }
  }
</script>