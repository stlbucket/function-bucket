<template>
  <div class="flex flex-col gap-3 grow">
    <div class="flex grow" v-for="t in tenants">
      <div class="flex flex-col gap-1 grow">
        <div class="flex">
          <NuxtLink :to="`/site-admin/tenant/${t.id}`">{{ t.name }}</NuxtLink>
        </div>
        <div class="flex justify-end">
          {{ t.status }}
        </div>
        <div class="flex justify-end">
          <UButton @click="onSupport(t)">Support</UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    tenants: Tenant[]
  }>()
  const emit = defineEmits<{
    (e: 'support', tenant: Tenant): void
  }>()

  const onSupport = async (tenant: Tenant) => {
    emit('support', tenant)
  }
</script>
