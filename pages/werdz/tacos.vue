<template>
  <div class="flex text-5xl justify-center">Word Block</div>
  <UCard v-if="game">
    <template #header>
      <div class="flex flex-col gap-1">
        <div class="flex gap-52 justify-center">
          <div class="flex flex-col gap-1">
            <div class="text-2xs">Offense</div>
            <div class="text-xl">{{ game.offensePlayerResident?.displayName }}</div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="text-2xs">Defense</div>
            <div class="text-xl">{{ game.defensePlayerResident?.displayName }}</div>
          </div>
        </div>
      </div>
    </template>
      <div class="flex flex-col gap-1">
        <div class="flex justify-center gap-24 pb-4">
          <div class="text-2xs">Word: {{ game.word }}</div>
          <div class="text-2xs">Game Status: {{ game.status }}</div>
          <div class="text-2xs">Round Number: {{ game.currentRoundNumber }}</div>
          <div class="text-2xs" v-if="game.currentRound">{{ game.currentRound.status }}</div>
        </div>
        <div class="flex gap-5 justify-center" v-if="userIsOnOffense">
          <Offense :game="game" />
          <Defense :game="game" />
        </div>
        <div class="flex gap-5 justify-center" v-else>
          <Defense :game="game" />
          <Offense :game="game" />
        </div>
      </div>
  </UCard>
  <!-- <pre>{{ JSON.stringify(game?.usedLetters,null,2) }}</pre>
  <pre>{{ JSON.stringify(game?.usedBlockingLetters,null,2) }}</pre> -->
  <pre>{{ JSON.stringify(game,null,2) }}</pre>
</template>

<script lang="ts" setup>
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const store = useWordBlockStore()
  const route = useRoute()
  const { game } = storeToRefs(store)

  const userIsOnOffense = computed(() => {
    return currentProfileClaims.value.residentId === game.value?.offensePlayerResident?.id
  })
  const userIsOnDefense = computed(() => {
    return currentProfileClaims.value.residentId === game.value?.defensePlayerResident?.id
  })

  const loadData = async () => {
    const result = await GqlWordBlockGameById({
      wbGameId: route.params.id
    })
    game.value = result.wbGame
    // setTimeout(loadData, 2000)
  }
  loadData()

  const onJoinGame = async () => {
    const result = await GqlJoinWordBlockGame({
      wbGameId: game.value.id
    })
    game.value = result.joinGame.wbGame
  }

</script>
