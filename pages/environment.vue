<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 2;
    background-color: green;
  }
  .card-row {
    display: flex;
    gap: 2;
  }
  .label {
    font-size: x-large;
    background-color: burlywood;
  }
  .card {
    display: flex;
    flex-direction: column;
    gap: 2;
    min-width: 40%;
    max-width: 40%;
    overflow: scroll;
    border: 2px;
    color: black;
    border-color: blue;
    border-style: solid;
    margin: 2px;
    background-color: blanchedalmond;
  }
</style>
<template>
  <div class="container">
    {{ environment }}
    <div class="card-row">
      <div class="card">
        <div class="label">Client Runtime Config</div>
        <pre>{{ useRuntimeConfig() }}</pre>
      </div>
    </div>
    <!-- <div class="card-row">
      <div class="card">
        <div class="label">Server ENV</div>
        <pre>{{ env }}</pre>
      </div>
      <div class="card">
        <div class="label">Server Runtime Config</div>
        <pre>{{ rtc }}</pre>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
  const rtc = ref()

  const loadData = async () => {
    const { data, error } = await useFetch('/api/rtc')

    if (error.value) {
      alert(error.value.message)
    }

    rtc.value = data.value
  }
  loadData()

  const env = ref()
  const loadEnv = async () => {
    const { data, error } = await useFetch('/api/env')

    if (error.value) {
      alert(error.value.message)
    }

    env.value = data.value
  }
  loadEnv()

  const environment = computed(() => {
    return process.env.NODE_ENV
  })
</script>
