<template>
  <div class="flex flex-col gap-3 grow">
    <div class="flex grow" v-for="ab in abUsers">
      <div class="flex flex-col gap-1 grow">
        <div class="flex">
          {{ ab.displayName }}
        </div>
        <div class="flex justify-end">
          {{ ab.email }}
        </div>
        <div class="flex justify-end">
          <UButton @click="onInvite(ab.email)" :disabled="!ab.canInvite" title="Admin users can send invitations to users not yet in their organization.">Invite</UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    abUsers: any[]
  }>()
  const emit = defineEmits<{
    (e: 'invite', email: string): void
  }>()

  const onInvite = async (email: string) => {
    emit('invite', email)
  }
</script>
