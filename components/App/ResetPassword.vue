<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
const supabase = useSupabaseClient()

const schema = z.object({
  email: z.string().email('Invalid email')
})

type Schema = z.output<typeof schema>

const state = reactive({
  email: '',
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with data
  const email: string = state.email
  if (!email) return

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.origin}/change-password`,
  })

  if (error) {
    alert(error.message)
  } else {
    alert('Check your email inbox to complete password reset!')
  }
}
</script>

<template>
  <UCard>
    <template #header>
      Reset Password
    </template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </UCard>
</template>

