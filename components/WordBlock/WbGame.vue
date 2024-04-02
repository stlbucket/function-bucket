<template>
  <UCard 
    v-if="game" 
    :ui="{
      base: '',
      background: 'bg-white dark:bg-gray-900',
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
      <div class="flex flex-col gap-1" v-if="userIsOnOffense">
        <div class="flex justify-between">
          <div class="flex flex-col">
            <div class="text-xl">{{ game.offensePlayerResident?.displayName }}</div>
            <div class="text-xs">{{  game.offenseScore }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-xl">{{ game.defensePlayerResident?.displayName }}</div>
            <div class="text-xs">{{  game.defenseScore }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-1" v-else>
        <div class="flex justify-between">
          <div class="flex flex-col">
            <div class="text-xl">{{ game.defensePlayerResident?.displayName }}</div>
            <div class="text-xs">{{  game.defenseScore }}</div>
          </div>
          <div class="flex flex-col">
            <div class="text-xl">{{ game.offensePlayerResident?.displayName }}</div>
            <div class="text-xs">{{  game.offenseScore }}</div>
          </div>
        </div>
      </div>
    </template>
      <div class="flex flex-col gap-1">
        <div class="flex justify-around pb-2">
          <div class="text-2xs">Word: {{ game.word }}</div>
          <div class="text-2xs">{{ game.status }}</div>
          <div class="text-2xs">Round: {{ game.currentRoundNumber }}</div>
          <!-- <div class="text-2xs" v-if="game.currentRound">{{ game.currentRound.status }}</div> -->
        </div>
        <div class="flex gap-5 justify-center" v-if="playerGamePosture === 'offense'">
          <Offense :wb-game="game" :user-is-on-offense="true"/>
          <Defense :wb-game="game" :user-is-on-defense="false"/>
        </div>
        <div class="flex gap-5 justify-center" v-else>
          <Defense :wb-game="game" :user-is-on-defense="true"/>
          <Offense :wb-game="game" :user-is-on-offense="false"/>
        </div>
      </div>
  </UCard>
  <!-- <pre>{{ JSON.stringify(game?.usedLetters,null,2) }}</pre>
  <pre>{{ JSON.stringify(game?.usedBlockingLetters,null,2) }}</pre> -->
  <!-- <pre>{{ JSON.stringify(game,null,2) }}</pre> -->
</template>

<script lang="ts" setup>
  export type PlayerGamePosture = 'offense' | 'defense'
  const refreshRate = 10000
  const props = defineProps<{
    wbGameId: string,
    playerGamePosture: PlayerGamePosture
  }>()
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const game = ref()

  const userIsOnOffense = computed(() => {
    return currentProfileClaims.value.residentId === game.value?.offensePlayerResident?.residentId
  })
  const userIsOnDefense = computed(() => {
    return currentProfileClaims.value.residentId === game.value?.defensePlayerResident?.residentId
  })

  const loadData = async () => {
    const result = await GqlWordBlockGameById({
      id: props.wbGameId
    })
    game.value = result.wbGame
    if (game.value.status === 'PLAYING') {
      setTimeout(loadData, refreshRate)
    }
  }
  loadData()

  const onJoinGame = async () => {
    const result = await GqlJoinWordBlockGame({
      id: game.value.id
    })
    game.value = result.joinGame.wbGame
  }

</script>
