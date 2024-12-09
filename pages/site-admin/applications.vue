<template>
  <ClientOnly>
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <UButton 
          v-for="a in applications" 
          :color="a.key === selectedApplication?.key ? 'blue' : 'green'"
          @click="onSelectApplication(a)"
        >{{ a.name }}</UButton>
      </div>
      <UCard v-if="selectedApplication">
        <div class="flex flex-col gap-3">
            <Application :application="selectedApplication" />
          </div>
      </UCard>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  const { data } = await useAllApplicationsQuery({
  variables: {}
})
  const applications: Ref<Application[]> = ref((data.value?.applications || []) as unknown as Application[])
  const selectedApplication = ref(applications.value[0])

  const onSelectApplication = async (application: Application) => {
    selectedApplication.value = application
  }
</script>
