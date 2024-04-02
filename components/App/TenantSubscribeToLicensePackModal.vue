
<template>
  <!-- <UButton icon="i-heroicons-pencil" size="sm" color="blue" square variant="solid" title="Edit Profile"  @click="showModal = true"/> -->
  <UButton size="sm" color="blue" square variant="solid" title="Edit Profile"  @click="showModal = true">New Subscription</UButton> 
  <UModal v-model="showModal">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        Subscribe Tenant to License Pack
      </template>
      <div class="text-xl">{{ tenant.name }}</div>
      <USelect v-model="selectedLicensePack" :options="addableLicensePacks" option-attribute="name" />      <!-- <UFormGroup name="profile" label="Profile">
        <div class="flex flex-col gap-3">
          <UInput placeholder="display name" v-model="formData.displayName" type="text" class="flex" data-1p-ignore/>
          <UInput placeholder="first name" v-model="formData.firstName" type="text" class="flex" data-1p-ignore/>
          <UInput placeholder="last name" v-model="formData.lastName" type="text" class="flex" data-1p-ignore/>
          <UInput placeholder="phone" v-model="formData.phone" type="text" class="flex" data-1p-ignore/>
        </div>
      </UFormGroup> -->
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
import type { ILicensePack, ITenant } from '~/db-types/index';

  const props = defineProps<{
    tenant: ITenant
  }>()

  const activeLicensePacks = ref([])
  const selectedLicensePack = ref()

  const showModal = ref(false)

  const formData = ref({})

  onMounted(() => {
    formData.value = {
  }
  })

  const emit = defineEmits<{
    (e: 'subscribe', licensePackKey: string): void
  }>()

  const handleSave = async () => {
    showModal.value = false
    emit('subscribe', selectedLicensePack.value)
  }

  const saveDisabled = computed(() => {
    return !selectedLicensePack.value
  })

  const loadData = async () => {
    const result = await GqlActiveLicensePacks()
    activeLicensePacks.value = result.licensePacksList
  }
  await loadData()

  const addableLicensePacks = computed(() => {
    return activeLicensePacks.value
    .filter((lp: ILicensePack) => lp.key !== 'anchor')
    .filter(
      (alp: ILicensePack) => {
        const existing =  props.tenant.tenantSubscriptions?.find(ts => ts.licensePackKey === alp.key)
        return !existing
      }
    ).map((lp: ILicensePack) => {
      return {
        name: lp.key,
        value: lp.key
      }
    })
  })
</script>