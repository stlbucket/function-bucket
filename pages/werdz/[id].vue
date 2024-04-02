<template>
  <WbMatch :wb-match="wbMatch" />
  <pre>{{ JSON.stringify(wbMatch,null,2) }}</pre>
</template>

<script lang="ts" setup>
  const route = useRoute()
  const wbMatch = ref()

  const loadData = async () => {
    const result = await GqlWbMatch({
      id: route.params.id
    })
    wbMatch.value = result.wbMatch
  }
  loadData()

</script>
