<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
const supabase = useSupabaseClient()
const appStateStore = useAppStateStore()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: state.email || '',
    password: state.password || '',
  })

  if (error) {
    alert('Bad email or password')
  } else {
    await refreshCurrentProfileClaims()
    // await refreshAvailableModules()
    await reloadNuxtApp({
      path: './my-profile',
      force: true
    })
  }

}
</script>

<template>
  <UCard>
    <!-- <template #header>
      Login
    </template> -->
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <div class="flex grow justify-center">
        <UButton type="submit">
          Login
        </UButton>
      </div>
    </UForm>
  </UCard>
</template>

