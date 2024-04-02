<template>
  <UCard 
    v-if="wbMatch"
    :ui="{
      base: '',
      background: 'bg-white dark:bg-gray-800',
      divide: 'divide-y divide-gray-200 dark:divide-gray-800',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
      rounded: 'rounded-lg',
      shadow: 'shadow',
      body: {
        base: '',
        background: '',
        padding: 'px-4 py-5 sm:p-6',
      },
      header: {
        base: '',
        background: '',
        padding: 'px-4 py-5 sm:px-6',
      },
      footer: {
        base: '',
        background: '',
        padding: 'px-4 py-4 sm:px-6',
      },
    }
    "
  >
    <template #header>
      <div class="flex justify-between">
        <div class="flex">
          <div v-if="wbMatch.player1Status === 'JOINED'" class="flex gap-2">
            <div>{{ wbMatch.player1Resident.displayName}}</div>
            <div>Set Score: {{ wbMatch.player1SetScore}}</div>
            <div>Total Score: {{ wbMatch.player1TotalScore}}</div>
          </div>
          <div v-else>
            {{ wbMatch.player1Status }}
            <UButton @click="onJoin(wbMatch)">Join</UButton>
          </div>
        </div>
        <div>Status: {{ wbMatch.status }}</div>
        <div class="flex gap-2">
          <div v-if="wbMatch.player2Status === 'JOINED'" class="flex gap-2">
            <div>{{ wbMatch.player2Resident.displayName}}</div>
            <div>Set Score: {{ wbMatch.player2SetScore}}</div>
            <div>Total Score: {{ wbMatch.player2TotalScore}}</div>
          </div>
          <div v-else>
            <!-- {{ wbMatch.player2Status }} -->
            <UButton @click="onJoin(wbMatch)">Join</UButton>
          </div>
        </div>
      </div>
    </template>
    <WbSet 
      v-if="wbMatch.status === 'PLAYING'"
      v-for="wbSet in wbMatch.wbSets" 
      :wb-set="wbSet"
      :player1-resident="wbMatch.player1Resident"
      :player2-resident="wbMatch.player2Resident"
    ></WbSet>
  </UCard>
  <pre>{{ JSON.stringify(wbMatch,null,2) }}</pre>
</template>

<script lang="ts" setup>
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const store = useWordBlockStore()
  const route = useRoute()
  // const { game } = storeToRefs(store)
  const props = defineProps<{
    wbMatch: any
  }>()

  const onJoin = async (wbMatch) => {
    const result = await GqlJoinWbMatch({
      wbMatchId: wbMatch.id
    })
  }

</script>
