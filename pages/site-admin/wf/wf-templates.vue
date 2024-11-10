<template>
  WF Templates
  <pre>{{ projectTemplates }}</pre>
</template>

<script lang="ts" setup>
  const { data } = await useAllProjectTemplatesQuery({
    variables: {}
  })
  const projectTemplates: Ref<Project[]> = ref((data.value?.projectTemplates || []) as unknown as Project[])
  const selectedProject = ref(projectTemplates.value[0])

  const onSelectProject = async (project: Project) => {
    selectedProject.value = project
  }

</script>