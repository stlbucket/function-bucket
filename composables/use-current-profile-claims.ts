const currentProfileClaimsQuery = ref()

const currentProfileClaims = ref({})
const availableModules = ref([])
const activeResidency = ref()

export async function useCurrentProfileClaims () {
  if (!currentProfileClaimsQuery.value) {
    currentProfileClaimsQuery.value = await useCurrentProfileClaimsQuery();
    currentProfileClaims.value = currentProfileClaimsQuery.value.data.currentProfileClaims || []
    availableModules.value = currentProfileClaimsQuery.value.data.availableModules || []
    activeResidency.value = currentProfileClaimsQuery.value.data.activeResidency[0]
  } else {
    const { data } = await currentProfileClaimsQuery.value.executeQuery();
    currentProfileClaims.value = data.value.currentProfileClaims || []
    availableModules.value = data.value.availableModules || []
    activeResidency.value = data.value.activeResidency[0]
  };
  return currentProfileClaims
}

export async function useAvailableModules() {
  return availableModules
}

export async function useActiveResidency () {
  return activeResidency
}

export async function refreshCurrentProfileClaims () {
  const { data } = await currentProfileClaimsQuery.value.executeQuery({
    requestPolicy: 'network-only'
  });
  currentProfileClaims.value = data.value.currentProfileClaims || undefined
  availableModules.value = data.value.availableModules || []
  activeResidency.value = data.value.activeResidency[0]
  return currentProfileClaims
}

export async function clearCurrentProfileClaims () {
  currentProfileClaims.value = {};
  availableModules.value = [];
  activeResidency.value = undefined;
}