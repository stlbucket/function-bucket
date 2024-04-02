<template>
  <UButton @click="showModal = true">NEW MATCH</UButton>
  <UModal v-model="showModal">
    <UCard>
      <template #header>
        New Match
      </template>
      <template #footer>
        <UButton @click="showModal = false">Cancel</UButton>
        <UButton @click="onSave">Save</UButton>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
  const showModal = ref(false)

  const onSave = async () => {
    const result = await GqlCreateWbMatch()
    showModal.value = false
    navigateTo(`/werdz/${result.createWbMatch.wbMatch.id}`)
  }
</script>