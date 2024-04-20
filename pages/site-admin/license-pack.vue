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
  const { data, executeQuery } = await useAllLicensePacksQuery()
  const licensePacks: Ref<LicensePack[]> = ref((data.value?.licensePacks || []) as unknown as LicensePack[])
  const selectedLicensePack = ref(licensePacks.value[0])

  const onSelectLicensePack = async (licensePack: LicensePack) => {
    selectedLicensePack.value = licensePack
  }
</script>
