<template>
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
</template>

<script lang="ts" setup>
  const applications: Ref<Application[]> = ref([])
  const selectedApplication: Ref<Application | undefined> = ref()

  const loadData = async () => {
    const result = await GqlAllApplications()
    applications.value = result.applications.nodes
    selectedApplication.value = applications.value[0]
  }
  loadData()

  const onSelectApplication = async (application: Application) => {
    selectedApplication.value = application
  }
</script>
