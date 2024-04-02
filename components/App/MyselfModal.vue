
<template>
  <UButton icon="i-heroicons-pencil" size="sm" color="blue" square variant="solid" title="Edit Profile"  @click="showModal = true"/>
  <UModal v-model="showModal">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        Edit Profile
      </template>
      <UFormGroup name="profile" label="Profile">
        <div class="flex flex-col gap-3">
          <UInput placeholder="display name" v-model="formData.displayName" type="text" class="flex" data-1p-ignore/>
          <UInput placeholder="first name" v-model="formData.firstName" type="text" class="flex" data-1p-ignore/>
          <UInput placeholder="last name" v-model="formData.lastName" type="text" class="flex" data-1p-ignore/>
          <UInput placeholder="phone" v-model="formData.phone" type="text" class="flex" data-1p-ignore/>
        </div>
      </UFormGroup>
      <template #footer>
        <div class="flex gap-1">
          <UButton @click="showModal = false">Cancel</UButton>
          <UButton @click="handleSave" :disabled="saveDisabled">Save</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    profile: AppProfile
  }>()

  const showModal = ref(false)

  const formData = ref({
    firstName: '',
    lastName: '',
    // email: '',
    phone: '',
    displayName: ''
  })

  onMounted(() => {
    formData.value = {
    firstName: props.profile.firstName || '',
    lastName: props.profile.lastName || '',
    // email: props.profile.email || '',
    phone: props.profile.phone || '',
    displayName: props.profile.displayName || '',
  }
  })

  const emit = defineEmits<{
    (e: 'new', todo: Todo): void
    (e: 'updated', todo: Todo): void
  }>()

  const handleSave = async () => {
    showModal.value = false
    emit('updated', {
      ...props.profile,
      ...formData.value
    })
  }

  const saveDisabled = computed(() => {
    return (!formData.value.displayName) || (formData.value.displayName.length < 4)
  })
</script>