<template>
  <UCard>
    <template #header>
      <div class="text-2xl">{{ licensePack.displayName }}
    </div></template>
    <div class="flex min-w-full justify-around">
      <UCard :ui="{
        base: 'flex flex-col min-w-[40%]',
        header: {
          base: 'flex grow',
        },
        body: {
        }
      }">
        <template #header>
          <div class="flex flex-col gap-2">
            <div class="text-xl">Scoped Licenses</div>
            <div v-if="userIsUser" class="text-sm">User cannot change own scoped licenses</div>
          </div>
        </template>
        <div class="flex flex-col gap-3 grow">
          <URadio v-for="l of scopedChoices" :key="l.name" v-model="selectedScoped" v-bind="l" :disabled="userIsUser || selectedScoped === l.value" @click="onScopedLicenseChange(l.value)"/>
        </div>
      </UCard>
      <UCard :ui="{
        base: 'flex flex-col min-w-[40%]',
        header: {
        },
        body: {
          base: 'flex grow',
        }
      }">
        <template #header>
          <div class="flex flex-col gap-2">
            <div class="text-xl">Unscoped Licenses</div>
            <div v-if="userIsUser" class="text-sm">User can change own unscoped licenses</div>
          </div>
        </template>
        <div class="flex flex-col gap-2 grow">
          <UCheckbox v-for="l of unscopedChoices" :key="l.name" v-model="selectedUnscoped[l.value]" v-bind="l"  @click="onUnscopedLicenseChange(l)"/>
        </div>
      </UCard>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const emit = defineEmits<{
    (e: 'grantLicense', licenseTypeKey: string): void
    (e: 'revokeLicense', license: License): void
  }>()

  const props = defineProps<{
    licensePack: LicensePack,
    resident: Resident
  }>()

  interface BooleanObject {
    [key: string]: boolean;
  }

  const selectedScoped = ref()
  const selectedUnscoped: Ref<BooleanObject> = ref({})

  const scopedChoices: Ref<USelectOption[]> = ref([])

  const unscopedChoices: Ref<{
    name: string
    value: string
    label: string
  }[]> = ref([])

  const prepareChoices = () => {
    scopedChoices.value = (props.licensePack.licensePackLicenseTypes ?? [])
      .filter((lt: LicensePackLicenseType) => ['ALL', 'NONE'].indexOf(lt.licenseType?.assignmentScope ?? '') === -1)
      .map((lt: LicensePackLicenseType) => {
        return {
          name: lt.licenseTypeKey,
          value: lt.licenseTypeKey,
          label: lt.licenseTypeKey        
        }
      })
      .sort((a,b) => a.label < b.label ? -1 : 1)

    const scopedLicenseTypeKeys = scopedChoices.value.map(sc => sc.value)
    selectedScoped.value = props.resident.licenses?.find((l: License) => scopedLicenseTypeKeys.indexOf(l.licenseTypeKey) > -1)?.licenseTypeKey

    unscopedChoices.value = (props.licensePack?.licensePackLicenseTypes ?? [])
      .filter((lt: LicensePackLicenseType) => ['ALL', 'NONE'].indexOf(lt.licenseType?.assignmentScope ?? '') > -1)
      .map((lt: LicensePackLicenseType) => {
        return {
          name: lt.licenseTypeKey,
          value: lt.licenseTypeKey,
          label: lt.licenseTypeKey        
        }
      })
      .sort((a,b) => a.label < b.label ? -1 : 1)

    selectedUnscoped.value = unscopedChoices.value.reduce(
      (a, c) => {
        const license = props.resident.licenses?.find((l: License) => l.licenseTypeKey === c.value)
        return {
          ...a,
          [c.value]: !!license
        }
      }, {}
    )    
  }
  onMounted(() => {
    prepareChoices()
  })

  const onUnscopedLicenseChange = async (licenseTypeInfo: LicenseType) => {
    const existingLicense = props.resident.licenses?.find((l:License) => l.licenseTypeKey === licenseTypeInfo.value)
    if (existingLicense) {
      emit('revokeLicense', existingLicense)
    } else {
      emit('grantLicense', licenseTypeInfo.value)
    }
  }

  const onScopedLicenseChange = async (licenseTypeKey: string) => {
    emit('grantLicense', licenseTypeKey)
  }

  const userIsUser = computed(() => {
    return currentProfileClaims.value.residentId === props.resident.id
  })
</script>