<template>
  <div class="flex flex-col gap-1">
    <UCard>
    <template #header>
      <div class="flex justify-between">
        MY PROFILE
        <ChangePassword></ChangePassword>
        <MyselfModal :profile="profile" v-if="profile" @updated="onUpdate"/>
      </div>
    </template>
    <div class="flex flex-col gap-3">
      <div v-for="df in dataFields" class="flex flex-col gap-1 border-2 rounded-md border-stone-400 p-2">
        <div class="text-xs">{{ df.label }}</div>
        <div :class="df.class">{{ df.value }}</div>
      </div>
    </div>
  </UCard>
  </div>
</template>

<script lang="ts" setup>
  // const supabase = useSupabaseClient()
  const profile = ref()
  const loadData = async () => {
    const result = await GqlGetMyself()
    profile.value = result.getMyself
  }
  loadData()

  const onEdit = async () => {
    alert('not implemented')
  }

  const dataFields = computed(() => {
    return [
    {
        label: 'Email',
        value: profile.value?.email,
        class: ''
      },
      {
        label: 'Display Name',
        value: profile.value?.displayName,
        class: ''
      },
      {
        label: 'First Name',
        value: profile.value?.firstName || 'not specified',
        class: profile.value?.firstName ? '' : 'italic'
      },
      {
        label: 'Last Name',
        value: profile.value?.lastName || 'not specified',
        class: profile.value?.lastName ? '' : 'italic'
      },
      {
        label: 'Phone',
        value: profile.value?.phone || 'not specified',
        class: profile.value?.phone ? '' : 'italic'
      },
    ]
  })

  const onUpdate = async (profile: AppProfile) => {
    const result = await GqlUpdateProfile({
      displayName: profile.displayName,
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone
    })
    await loadData()
  }
  // const onChangePassword = async () => {
  //   const forSure = confirm('Are you sure you want to change your password?')
  //   if (forSure) {
  //     const { error } = await supabase.auth.resetPasswordForEmail(profile.value.email, {
  //       redirectTo: `${window.origin}/change-password`,
  //     })

  //     if (error) {
  //       alert(error.message)
  //     } else {
  //       alert('Check your email inbox to complete password reset!')
  //       navigateTo('/logout')
  //     }      
  //   }
  // }
</script>
