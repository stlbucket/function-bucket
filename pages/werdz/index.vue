<template>
  <UCard>
    <template #header><div class="flex text-7xl justify-center">Word Block</div></template>
    <!-- <UButton @click="onNewGame" :disabled="false">New Game</UButton> -->
      <NewMatchModal />
      <UTable
        :rows="matches"
        :columns="[
          {key: 'player1', label: 'Player 1'},
          {key: 'status', label: 'Status'},
          {key: 'player2', label: 'Player 2'},
        ]"
      >
      <template #status-data="{ row }">
        <NuxtLink :to="`/werdz/${row.id}`">{{ row.status }}</NuxtLink>
      </template>
      <template #player1-data="{ row }">
        <div class="flex gap-2">
          <div v-if="row.player1Status === 'JOINED'">
            {{ row.player1Status }}
            {{ row.player1Resident.displayName}}
          </div>
          <div v-else>
            {{ row.player1Status }}
            <UButton @click="onJoin(row)">Join</UButton>
          </div>
        </div>
      </template>
      <template #player2-data="{ row }">
        <div class="flex gap-2">
          <div v-if="row.player2Status === 'JOINED'">
            {{ row.player2Status }}
            {{ row.player2Resident.displayName}}
          </div>
          <div v-else>
            {{ row.player2Status }}
            <UButton @click="onJoin(row)">Join</UButton>
          </div>
        </div>
      </template>
    </UTable>
  </UCard>
  <pre>{{matches}}</pre>
</template>

<script lang="ts" setup>
  const store = useWordBlockStore()
  const matches = ref([])

  const loadData = async () => {
    const result = await GqlAllWbMatches()
    matches.value = result.wbMatches
  }
  loadData()
  // const { game, currentRound } = storeToRefs(store)
  // const currentGuess = ref('')

  // const guessDisabled = computed(() => {
  //   return currentGuess.value.length !== game.value.wordLength
  // })
  // const clearDisabled = computed(() => {
  //   return currentGuess.value.length !== 0
  // })

  // watch(() => currentGuess.value, () => {
  //   currentGuess.value = (currentGuess.value.length > game.value.wordLength) ? currentGuess.value.split('').slice(0, -1).join('') : currentGuess.value
  // })

  // const onGuess = () => {
  //   store.setGuess(currentGuess.value)
  // }

  // const onClear = () => {
  //   currentGuess.value = ''
  // }
  // const newRoundDisabled = () => {
  //   return currentRound.value && currentRound.value.status !== 'closed'
  // }
  // const onSettleCurrentRound = () => {
  //   store.settleCurrentRound()
  // }
  const onJoin = async (wbMatch) => {
    const result = await GqlJoinWbMatch({
      wbMatchId: wbMatch.id
    })
  }
</script>