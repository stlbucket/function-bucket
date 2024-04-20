<template>
  <div class="flex flex-col gap-2">
    <div class="flex gap-2">
      <UButton 
        v-for="lp in licensePacks" 
        :color="lp.key === selectedLicensePack?.key ? 'blue' : 'green'"
        @click="onSelectLicensePack(lp)"
      >{{ lp.key }}</UButton>
    </div>
    <div class="flex md:hidden">
      <UCard v-if="selectedLicensePack">
        <div class="flex flex-col gap-3">
            <LicensePackSmall :licensePack="selectedLicensePack" />
          </div>
      </UCard>
    </div>
    <div class="hidden md:flex">
      <UCard v-if="selectedLicensePack">
        <div class="flex flex-col gap-3">
            <LicensePack :licensePack="selectedLicensePack" />
          </div>
      </UCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const licensePacks: Ref<LicensePack[]> = ref([])
  const selectedLicensePack: Ref<LicensePack | undefined> = ref()

  const loadData = async () => {
    const result = await GqlAllLicensePacks()
    licensePacks.value = result.licensePacks.nodes
    selectedLicensePack.value = licensePacks.value[0]
  }
  loadData()

  const onSelectLicensePack = async (licensePack: LicensePack) => {
    selectedLicensePack.value = licensePack
  }
</script>
