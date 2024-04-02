<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: `${window.origin}/authenticated`,
    }
  })
  if (error) console.log(error)
}
</script>
<template>
  <UCard>
    <template #header>
      <h1>Sign In</h1>
    </template>
    <input
      v-model="email"
      type="email"
    />
    <button @click="signInWithOtp">
      Sign In with E-Mail
    </button>
  </UCard>
</template>
