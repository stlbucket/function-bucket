<template>
  <!-- <pre>{{wbSet}}</pre> -->
  <UCard>
      <template #header>
        <div class="flex justify-around">
          <div class="flex gap-1">
            {{ player1Resident?.displayName}}
            {{ wbSet.player1Score }}
          </div>
          <div class="flex justify-center">Set # {{ wbSet.setNumber }}</div>
          <div class="flex justify-center">{{ wbSet.status }}</div>
          <div class="flex justify-around">
            <div class="flex gap-1">
              {{ player2Resident?.displayName}}
              {{ wbSet.player2Score }}
            </div>
          </div>
        </div>
      </template>
      <div class="flex gap-1 justify-around">
        <div>
          <WbGame 
            :wb-game-id="offenseGame(wbSet).id" 
            player-game-posture="offense"
          />
          <WbGame
            v-if="wbSet.player1OffenseGame.offensePlayerResidentId = wbSet.player2OffenseGame.defensePlayerResidentId"
            :wb-game-id="offenseGame(wbSet).id" 
            player-game-posture="defense"
          />
        </div>
        <div>
          <WbGame
            v-if="wbSet.player1OffenseGame.offensePlayerResidentId = wbSet.player2OffenseGame.defensePlayerResidentId"
            :wb-game-id="defenseGame(wbSet).id" 
            player-game-posture="offense"
          />
          <WbGame 
            :wb-game-id="defenseGame(wbSet).id"
            player-game-posture="defense"
          />
        </div>
      </div>
    </UCard>
</template>

<script lang="ts" setup>
import type { IResident } from '~/db-types';

  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const props = defineProps<{
    wbSet: any,
    player1Resident: IResident,
    player2Resident: IResident
  }>()

  const offenseGame = (wbSet) => {
    const game = wbSet.player1OffenseGame
    return game
  }

  const defenseGame = (wbSet) => {
    const game = wbSet.player2OffenseGame
    return game
  }

  // const offenseGame = computed(() => {
  //   return wbSet.wbGames.find((g:any) => g.residentId === currentProfileClaims.residentId).id
  //   // retur
  // })

</script>
