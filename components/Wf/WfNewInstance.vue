
<template>
  <UButton color="blue" square variant="solid" title="New Workflow Instance"  @click="showModal = true">New Workflow Instance</UButton>
  <UModal v-model="showModal">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        Start Workflow Instance
      </template>
      <UFormGroup name="wf" label="Input Parameters">
        <div class="flex flex-col gap-3">
          <!-- <UInput placeholder="identifier" v-model="formData.identifier" type="text" class="flex" data-1p-ignore/> -->
          <span v-for="f in formFields"><UInput :placeholder="f.placeholder" v-model="formData[f.label]" type="text" class="flex" data-1p-ignore/></span>
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
    wf: Wf
  }>()

  const showModal = ref(false)

  const fd = props.wf.inputDefinitions.reduce((a: any, ipDef: any) => {
    return {
      ...a,
      [ipDef.name]: ipDef.defaultValue || ''
    }
  }, {})

  const formData = ref(fd)

  const formFields = computed(() => {
    return props.wf.inputDefinitions.map(ipDef => {
      return {
        isRequired: ipDef?.isRequired,
        label: String(ipDef?.name),
        placeholder: `${ipDef?.isRequired ? 'required:  ' : 'optional:  '} ${String(ipDef?.name)} `
      }
    })
  })

  const emit = defineEmits<{
    (e: 'newWorkflowInstance', inputData: any): void
  }>()

  const handleSave = async () => {
    showModal.value = false
    emit('newWorkflowInstance', {
      ...formData.value
    })
  }

  const saveDisabled = computed(() => {
    return formFields.value
      .map((ff: any) => {
        if (!ff.isRequired) return false;
        const fieldValueMissing = !(formData.value[ff.label])
        if (fieldValueMissing) return true
      })
      .find(missing => missing) || false
  })
</script>