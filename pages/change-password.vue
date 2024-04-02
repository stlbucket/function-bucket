<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const schema = z.object({
  password: z.string().min(8, 'Must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive({
  password: undefined,
  confirmPassword: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  if (state.password !== state.confirmPassword) {
    alert('Passwords do not match!')
    state.password = undefined
    state.confirmPassword = undefined
  }
  const {error} = await supabase.auth.updateUser({ password: state.password })
  if (error) {
    alert(error)
  } else {
    alert('Password Changed')
    navigateTo('./logout')
  }
}
</script>

<template>
  <UCard>
    <template #header>
      Change Password
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
      <UFormGroup label="Confirm Password" name="password">
        <UInput v-model="state.confirmPassword" type="password" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </UCard>
  <pre>{{ JSON.stringify(user,null,2) }}</pre>
</template>

