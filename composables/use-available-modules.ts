const availableModulesQuery = ref()

const availableModules = ref([])

export async function useAvailableModules () {
  if (!availableModulesQuery.value) {
    availableModulesQuery.value = await useAvailableModulesQuery();
    availableModules.value = availableModulesQuery.value.data.availableModules || []
  } else {
    const { data } = await availableModulesQuery.value.executeQuery();
    availableModules.value = data.value.availableModules || []
  };
  return availableModules
}

export async function refreshAvailableModules () {
  const { data } = await availableModulesQuery.value.executeQuery({
    requestPolicy: 'network-only'
  });
  availableModules.value = data.value.availableModules || []
  return availableModules
}