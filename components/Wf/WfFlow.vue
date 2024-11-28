<template>
  <div>
    <WfNewInstance :wf="wf" @new-workflow-instance="onNewWorkflowInstance" />
  </div>
  <div>
    <div 
      v-if="flowNodes[0]" 
      class="flex grow-1 bg-gray-800"
      style="height: 700px; background-color: green" 
    >
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
            {{ uow.data.type }} - {{ uow.data.name }}
          </div>
          <MilestoneNode
            :uow="uow"
            @click="onUowSelected(uow)"
            @expand="onMilestoneExpand"
          />
        </template>
        <template #node-TASK="uow">
          <!-- <div class="flex text-xs mt-1" style="background-color: blue;">
            {{ uow.data.type }} - {{ uow.data.name }}
          </div> -->
            <TaskNode
            :uow="uow"
            @click="onUowSelected(uow)"
          />
        </template>
      </VueFlow>
    </div>
  </div>
  <div class="flex flex-col grow-1 gap-2">
    <div class="flex p-3"></div>
    <div class="flex justify-between grow-1 rounded">
      <pre class="flex text-xs bg-gray-600 w-2/5 border-2 rounded">{{ { debugOutput } }}</pre>
      <pre class="flex text-xs bg-gray-600 w-2/5 border-2 rounded">{{ { wf } }}</pre>
    </div>
  </div>
</template>

<script lang="ts" setup>
  /* these are necessary styles for vue flow */
  import '@vue-flow/core/dist/style.css';

  /* this contains the default theme, these are optional styles */
  import '@vue-flow/core/dist/theme-default.css';

  import { VueFlow, type NodeProps, type Node, type Edge, MarkerType } from '@vue-flow/core'

  import { useWfLayoutElk } from '~/composables/use-wf-layout';
import { useQueueWorkflowMutation } from '~/graphql/api';

  const props = defineProps<{
    wf: Wf
  }>()

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
    const {
      reducedLayout, elkLayout
    } = await useWfLayoutElk(props.wf)
    debugOutput.value = reducedLayout
    flowNodes.value = reducedLayout

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

  const queueWorkflowMutation = await useQueueWorkflowMutation();
  const onNewWorkflowInstance = async (workflowInputData: any) => {
    alert(JSON.stringify(workflowInputData,null,2))
    const identifier = props.wf.identifier;
    if (!identifier) throw new Error ('Unable to queue workflow')
    const { data, error } = await queueWorkflowMutation.executeMutation({
      identifier,
      workflowInputData
    })
    if (error) alert(error.toString())
    console.log(JSON.stringify(data, null, 2))

    // navigateTo('/site-admin/tenant')
  }
</script>
