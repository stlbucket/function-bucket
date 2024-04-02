<template>
  <div class="flex flex-col gap-3 border-solid border-2 rounded p-4 bg-gray-600">
    <!-- <div class="flex justify-center border-b-2 pb-2 border-dotted">
      <UButton :class="`${userIsOnOffense ? '': 'invisible' }`" @click="onStartGuess" :disabled="guessDisabled">Guess</UButton>
    </div> -->
    <div v-for="r in wbGame.rounds" class="flex flex-col gap-2">
      <!-- {{ r.roundNumber }} - {{ r.status }} - {{ userIsOnOffense }} -->
      <div class="flex gap-4" v-if="r.status !== 'OPEN' || !userIsOnOffense || r.guess">
        <div 
          v-for="l in r.letterResults" 
          :class="`flex justify-center align-middle border-solid border-2 rounded w-9 h-9 text-2xl ${cssSegment(l)}`"
        >
          <!-- <div v-if="userIsOnOffense || ['CORRECT', 'BLOCKED'].indexOf(l.status) > -1">{{ l.letter }}</div> -->
          <div>{{ l.letter.toUpperCase() }}</div>
        </div>
      </div>
      <div v-else class="flex justify-center">
        <UButton
          @click="onStartGuess"
          icon="i-heroicons-question-mark-circle"
          color="green"
          square 
          variant="solid" 
          title="Guess the word!"
        ></UButton>
        <!-- <UButton :class="`${userIsOnOffense ? '': 'invisible' }`" @click="onStartGuess" :disabled="guessDisabled">Guess</UButton> -->
      </div>
    </div>
  </div>
  <UModal
    v-model="showModal"
  >
    <UCard>
      <template #header>
        Submit a Guess
      </template>

      <UForm
        :state="state"
      >
        <UFormGroup>
          <UInput v-model="state.currentGuess" :maxlength="wbGame.word.length"/>
        </UFormGroup>
      </UForm>
      <div class="flex flex-col gap-1 pt-3" v-if="previousGuesses.length">
        <div class="flex text-xs">Previous Guesses</div>
        <div class="flex flex-col gap-1">
          <div class="flex" v-for="g in previousGuesses">{{ g }}</div>
        </div>
      </div>
      <!-- <div class="flex flex-col gap-1 pt-3">
        <div class="flex text-xs">Used Letters</div>
        <div class="flex gap-1">
          <div class="flex" v-for="l in wbGame.usedLetters">{{ l }}</div>
        </div>
      </div> -->
      <template #footer>
        <div class="flex gap-2 justify-end">
          <UButton @click="showModal = false">Cancel</UButton>
          <UButton @click="onGuess">Save</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
  <!-- <pre>{{ JSON.stringify(userIsOnOffense) }}</pre> -->
</template>

<script lang="ts" setup>
  const props = defineProps<{
    wbGame: any,
    userIsOnOffense: boolean
  }>()
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const showModal = ref(false)

  const state = ref({
    currentGuess: ''
  })

  // const currentGuess = ref('')

  const guessDisabled = computed(() => {
    return props.wbGame.currentRound.status !== 'OPEN'
  })
  const clearDisabled = computed(() => {
    return state.value.currentGuess.length === 0
  })

  watch(() => state.value.currentGuess, () => {
    state.value.currentGuess = (state.value.currentGuess.length > props.wbGame.wordLength) ? state.value.currentGuess.split('').slice(0, -1).join('') : state.value.currentGuess
  })

  const onStartGuess = () => {
    state.value.currentGuess = ''
    showModal.value = true
  }
  const onGuess = async () => {
    const result = await GqlSetCurrentGuess({
      wbGameId: props.wbGame.id,
      guess: state.value.currentGuess
    })
    showModal.value = false
  }

  const cssSegment = (letterResult: any) => {
    switch (letterResult.status) {
      case 'CORRECT':
        return 'bg-green-600'
      case 'MISPLACED':
        return 'bg-yellow-600'
      case 'BLOCKED':
        return 'bg-red-600'
      case 'SURPLUS':
        return 'bg-gray-950'
      default:
        return ''
    }
  }

  const disallowedLetters = computed(() => {
    return props.wbGame.usedLetters
  })

  const previousGuesses = computed(() => {
    return props.wbGame.rounds.map((r: any) => r.guess).filter(g => ['', ' ', null, undefined].indexOf(g) === -1)
  })
</script>
