<template>
  <UCard>
    <template #header>Xstate</template>
    <div class="flex justify-between">
      <UCard>
        <template #header>Machine</template>
        <pre>{{ machine }}</pre>
      </UCard>
      <UCard>
        <template #header>Actor</template>
        <pre>{{ actor }}</pre>
      </UCard>
      <UCard>
        <template #header>ActorRef</template>
        <pre>{{ actorRef }}</pre>
      </UCard>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useActorRef, useMachine } from '@xstate/vue'
import { setup, assign } from 'xstate';

const machine = setup({
  types: {
    context: {} as { count: number },
    events: {} as 
    | { type: 'inc' }
    | { type: 'dec' }
  },
  actions: {
    increment: assign({
      count: ({ context }) => context.count + 1
    }),
    decrement: assign({
      count: ({ context }) => context.count - 1
    })
  }
})
.createMachine({
  context: { count: 0 },
  on: {
    inc: { actions: 'increment' },
    dec: { actions: 'decrement' }
  }
})

const actorRef = useActorRef(machine);
const actor = useMachine(machine)
  // const actor = useInterpret(
  //   machine,
  //   {
  //     actions: {
  //       /* ... */
  //     },
  //   },
  //   (state) => {
  //     // subscribes to state changes
  //     console.log(state.value);
  //   },
  // );
</script>