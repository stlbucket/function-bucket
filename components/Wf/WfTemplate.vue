<template>
    <div>
    <WfNewInstance :wf="wf" @new-workflow-instance="onNewWorkflowInstance" />
  </div>

  <WfFlow :wf="wf"></WfFlow>
  <!-- <pre>{{ wf }}</pre> -->
</template>

<script lang="ts" setup>
  import { useQueueWorkflowMutation } from '~/graphql/api';

  const props = defineProps<{
    wf: Wf
  }>()

  const queueWorkflowMutation = await useQueueWorkflowMutation();

  const onNewWorkflowInstance = async (workflowInputData: any) => {
    const identifier = props.wf.identifier;
    if (!identifier) throw new Error ('Unable to queue workflow - no identifier')
    const { data, error } = await queueWorkflowMutation.executeMutation({
      identifier,
      workflowInputData
    })
    if (error) alert(error.toString())

    navigateTo(`/site-admin/wf/${props.wf.identifier}/instance/${data?.queueWorkflow?.json?.wf?.id}`)
  }
</script>