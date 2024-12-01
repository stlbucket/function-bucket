<template>
  <div>
    <div 
      v-if="flowNodes[0]" 
      class="flex flex-col grow-1 bg-gray-800"
      style="height: 700px; width: 1150px;" 
    >
      <div v-if="wf.isTemplate" class="flex grow-1 justify-between p-1">
        <div class="flex gap-1">
          <UButton @click="onSaveLayout">Save Layout</UButton>
          <UButton @click="onResetLayout">Reset Layout</UButton>
        </div>
        <WfNewInstance :wf="wf" @new-workflow-instance="onNewWorkflowInstance" />
      </div>
      <VueFlow 
        :nodes="flowNodes" 
        :edges="flowEdges" 
        elevate-edges-on-select
        fit-view-on-init
      >
        <template #node-WF="uow">
          <WfNode
            :uow="uow"
            @click="onUowSelected(uow)"
          />
        </template>
        <template #node-MILESTONE="uow">
          <div class="flex text-xs" style="background-color: purple;">
            {{ uow.data.type }} - {{ uow.data.name }} - {{ uow.data.status }}
          </div>
          <MilestoneNode
            :uow="uow"
            @click="onUowSelected(uow)"
            @expand="onMilestoneExpand"
          />
        </template>
        <template #node-TASK="uow">
          <TaskNode
            :uow="uow"
            @click="onUowSelected(uow)"
          />
        </template>
        <template #node-TRIGGER="uow">
          <TriggerNode
            :uow="uow"
            @click="onUowSelected(uow)"
          />
        </template>
      </VueFlow>
    </div>
  </div>
  <div class="flex gap-1 items-stretch">
      <UCard>
        <template #header>Input Data</template>
        <pre>{{ wf.workflowData.workflowInputData }}</pre>
      </UCard>
      <UCard>
        <template #header>Workflow Data</template>
        <pre>{{ wf.workflowData }}</pre>
      </UCard>
    </div>    
  <div class="flex flex-col gap-2">
    <div class="flex p-3"></div>
    <div class="flex rounded">
      <pre class="flex text-xs bg-gray-600 w-2/5 border-2 rounded">{{ { debugOutput } }}</pre>
      <pre class="flex text-xs bg-gray-600 w-2/5 border-2 rounded">{{ { flowNodes } }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
  /* these are necessary styles for vue flow */
  import '@vue-flow/core/dist/style.css';

  /* this contains the default theme, these are optional styles */
  import '@vue-flow/core/dist/theme-default.css';

  import { VueFlow, type NodeProps, type Node, type Edge, MarkerType, useVueFlow } from '@vue-flow/core'

  import { useWfLayout } from '~/composables/use-wf-layout';
  import { useSaveWfLayoutMutation, useResetWfLayoutMutation } from '~/graphql/api';

  const { updateNode, getNodes } = useVueFlow()

  const props = defineProps<{
    wf: Wf
  }>()

  watch(() => props.wf, () => {
    const updatedUows = flowNodes.value.map(existingNode => {
      const newUow = props.wf.uowsList.find(uow => uow.id === existingNode.id)
      if (!newUow) return null
      if (newUow.status === existingNode.data.status) return null
      return newUow
    })
    .filter(n => !!n)
    // .map(n => n.id)

    updatedUows.forEach(uow => {
      updateNode(uow.id, {
        data: uow
      })
    })

    // alert(JSON.stringify(updatedUows,null,2))
  })

  const onUowSelected = (uowNode: NodeProps) => {
    // alert('not implemented')
  }

  const onMilestoneExpand = (id: string) => {
    alert(id)
  }

  const debugOutput = ref([] as any)
  const flowNodes = ref([] as Node[])
  const flowEdges = ref([] as Edge[])

  const computeLayout = async () => {
    const layoutResult = await useWfLayout(props.wf)
    debugOutput.value = props.wf
    flowNodes.value = layoutResult.reducedLayout

    flowEdges.value = (props.wf.uowDependenciesList || [])
    .map((dependency, i) => {
        return {
        id: dependency.id,
        source: dependency.dependeeId,
        target: dependency.dependerId,
        animated: true,
        markerEnd: MarkerType.ArrowClosed
      }
    }) || []

  }
  computeLayout()

  const saveWfLayoutMutation = await useSaveWfLayoutMutation()
  const onSaveLayout = async () => {
    const currentLayout = { nodes: getNodes.value
      .map(wfn => {
        const {id, position, width, height, data: { identifier }} = wfn;
        return {id, position, width, height, identifier}
      })
    }
    const { data, error } = await saveWfLayoutMutation.executeMutation({
      wfIdentifier: props.wf.identifier || '',
      layout: currentLayout
    })
    if (error) alert(error.toString())
  }

  const resetWfLayoutMutation = await useResetWfLayoutMutation()
  const onResetLayout = async () => {
    const { data, error } = await resetWfLayoutMutation.executeMutation({
      wfIdentifier: props.wf.identifier || ''
    })
    if (error) alert(error.toString())
  }

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

<style scoped>
/* .vue-flow__node-WF {
    background: cyan;
    color: #888;
    padding: 10px;
} */
</style>