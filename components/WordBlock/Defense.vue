<template>
  <div class="flex flex-col gap-3 border-solid border-2 rounded p-4 bg-gray-600">
    <div v-for="r in wbGame.rounds" class="flex flex-col gap-2">
      <!-- {{ r.roundNumber }} - {{ r.blockResult.status }} -->
      <div v-if="r.status !== 'OPEN' || r.blockingLetter" class="flex justify-around items-center">
        <div :class="`flex justify-center align-middle border-solid border-2 rounded w-9 h-9 text-2xl ${cssSegment(r.blockResult)}`">
          <!-- <div>{{ r.blockingLetter }}</div> -->
          <div v-if="userIsOnDefense || ['BLOCKED'].indexOf(r.blockResult) > -1">{{ r.blockingLetter?.toUpperCase() }}</div>
        </div>
      </div>
      <div v-else :class="`flex justify-around items-center`">
        <UButton
          @click="onStartBlock"
          icon="i-heroicons-stop-circle"
          color="red" 
          square 
          variant="solid" 
          title="Choose blocking letter"
          :class="`${userIsOnDefense ? '' : 'invisible'}`"
        ></UButton>
        <!-- <UButton :class="`${userIsOnDefense ? '' : 'invisible'}`" @click="onStartBlock" :disabled="blockDisabled">Block</UButton> -->
        <!-- <UButton :class="`${userIsOnDefense ? '' : 'invisible'}`" @click="onPass" :disabled="blockDisabled">Pass</UButton> -->
      </div>
    </div>
  </div>
  <UModal
    v-model="showModal"
  >
    <UCard>
      <template #header>
        Blocking Letter
      </template>
      <UForm
        :state="state"
        :validate="validate"
        @submit="onSubmit"
        ref="defenseForm"
      >
        <UFormGroup name="currentBlock" label="Blocking Letter">
          <UInput v-model="state.currentBlock" maxlength="1"/>
        </UFormGroup>
        <div class="flex justify-between grow p-6">
          <div class="flex flex-col gap-1">
            <div class="flex text-xs">Used Letters</div>
            <div class="flex gap-1">
              <div class="flex" v-for="l in wbGame.usedLetters">{{ l }}</div>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <div class="flex text-xs">Blocked Letters</div>
            <div class="flex gap-1">
              <div class="flex" v-for="l in wbGame.usedBlockingLetters">{{ l }}</div>
            </div>
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <UButton @click="showModal = false">Cancel</UButton>
          <UButton type="submit" :disabled="saveDisabled">Save</UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
  import type { FormError, FormSubmitEvent } from '#ui/types'

  const props = defineProps<{
    wbGame: any,
    userIsOnDefense: boolean
  }>()
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const showModal = ref(false)

  const state = reactive({
    currentBlock: ''
  })
  // const currentBlock = ref('')
  const defenseForm = ref()

  const blockDisabled = computed(() => {
    return props.wbGame.currentRound.blockResult.status !== 'PLANNED'
  })

  const saveDisabled = computed(() => {
    return defenseForm.value?.errors.length > 0
  })

  async function onSubmit (event: FormSubmitEvent<any>) {
    const result = await GqlSetCurrentBlockingLetter({
      wbGameId: props.wbGame.id,
      blockingLetter: event.data.currentBlock
    })
    showModal.value = false
  }

  const onStartBlock = async () => {
    state.currentBlock = ''
    showModal.value = true
  }

  const onPass = async () => {
    const result = await GqlPassCurrentBlockingLetter({
      wbGameId: props.wbGame.id
    })
    showModal.value = false
  }

  const cssSegment = (blockResult: any) => {
    switch (blockResult.status) {
      case 'DISABLED':
        return 'invisible'
      case 'MISSED':
        return 'bg-gray-950'
        // return 'bg-purple-600'
      case 'PASSED':
        return 'bg-gray-950'
        // return 'bg-indigo-600'
      case 'BLOCKED':
        return 'bg-red-600'
      case 'SURPLUS':
        return 'bg-gray-950'
      default:
        return ''
    }
  }

const validate = (state: any): FormError[] => {
  const errors = []
  if (props.wbGame.usedLetters.indexOf(state.currentBlock) > -1) errors.push({ path: 'currentBlock', message: 'Cannot block used letters' })
  console.log('errors', errors)
  return errors
}
</script>
