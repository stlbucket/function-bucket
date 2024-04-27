const currentProfileClaimsQuery = ref()

const currentProfileClaims = ref({})

export async function useCurrentProfileClaims () {
  if (!currentProfileClaimsQuery.value) {
    currentProfileClaimsQuery.value = await useCurrentProfileClaimsQuery();
    currentProfileClaims.value = currentProfileClaimsQuery.value.data.currentProfileClaims || []
  } else {
    const { data } = await currentProfileClaimsQuery.value.executeQuery();
    currentProfileClaims.value = data.value.currentProfileClaims || []
  };
  return currentProfileClaims
}

export async function refreshCurrentProfileClaims () {
  const { data } = await currentProfileClaimsQuery.value.executeQuery({
    requestPolicy: 'network-only'
  });
  currentProfileClaims.value = data.value.currentProfileClaims || []
  return currentProfileClaims
}

// const currentProfileClaimsQuery = ref()

// export async function useCurrentProfileClaims () {
//   if (!currentProfileClaimsQuery.value) {
//     currentProfileClaimsQuery.value = await useCurrentProfileClaimsQuery();
//   };
//   const { data } = await currentProfileClaimsQuery.value.executeQuery();
//   return data.value?.currentProfileClaims;
// }

// export async function refreshCurrentProfileClaims () {
//   const { data } = await currentProfileClaimsQuery.value.executeQuery({
//     requestPolicy: 'network-only'
//   });
//   return data.value?.currentProfileClaims;
// }