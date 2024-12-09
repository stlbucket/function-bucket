<script setup>
import { ref } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'

const nodes = ref([
  
    // {
    //   "id": "bde381fa-0084-405f-bbe2-73a472b35f1b",
    //   "type": "WF",
    //   "label": "The Waiting Game",
    //   "width": 1342,
    //   "height": 444,
    //   "extent": "parent",
    //   "expandParent": true,
    //   "position": {
    //     "x": 0,
    //     "y": 0
    //   },
    //   "data": {
    //     "width": 1342,
    //     "height": 444,
    //     "id": "bde381fa-0084-405f-bbe2-73a472b35f1b",
    //     "completedAt": null,
    //     "createdAt": "2024-12-01T03:57:15.082483+00:00",
    //     "data": {},
    //     "description": "The Waiting Game root uow",
    //     "dueAt": null,
    //     "identifier": "the-waiting-game",
    //     "isTemplate": true,
    //     "name": "The Waiting Game",
    //     "parentUowId": null,
    //     "status": "TEMPLATE",
    //     "tenantId": "d75654b8-444a-4cf2-87ef-44100f825667",
    //     "type": "WF",
    //     "updatedAt": "2024-12-01T03:57:15.082483+00:00",
    //     "useWorker": true,
    //     "wfId": "0f8967c4-3e7f-4a44-a7fa-c962341275d0",
    //     "workflowError": {},
    //     "workflowHandlerKey": "close-workflow-wf",
    //     "__typename": "Uow"
    //   }
    // },
    // {
    //   "parentNode": "bde381fa-0084-405f-bbe2-73a472b35f1b",
    //   "id": "2af36eef-9a4c-48e4-b329-9d631c7e60b8",
    //   // "type": "TASK",
    //   "label": "Wait Last",
    //   "width": 200,
    //   "height": 100,
    //   "extent": "parent",
    //   "expandParent": true,
    //   "position": {
    //     "x": 1020,
    //     "y": 344
    //   },
    //   "data": {
    //     "width": 200,
    //     "height": 100,
    //     "id": "2af36eef-9a4c-48e4-b329-9d631c7e60b8",
    //     "completedAt": null,
    //     "createdAt": "2024-12-01T03:57:15.082483+00:00",
    //     "data": {
    //       "afterStepDelay": 2500
    //     },
    //     "description": "More waiting",
    //     "dueAt": null,
    //     "identifier": "wait-last",
    //     "isTemplate": true,
    //     "name": "Wait Last",
    //     "parentUowId": "bde381fa-0084-405f-bbe2-73a472b35f1b",
    //     "status": "TEMPLATE",
    //     "tenantId": "d75654b8-444a-4cf2-87ef-44100f825667",
    //     "type": "TASK",
    //     "updatedAt": "2024-12-01T03:57:15.082483+00:00",
    //     "useWorker": true,
    //     "wfId": "0f8967c4-3e7f-4a44-a7fa-c962341275d0",
    //     "workflowError": {},
    //     "workflowHandlerKey": "wait",
    //     "__typename": "Uow"
    //   }
    // },
    // {
    //   "parentNode": "bde381fa-0084-405f-bbe2-73a472b35f1b",
    //   "id": "47c5f002-327f-4d44-b720-1770f3551846",
    //   "type": "MILESTONE",
    //   "label": "Wait for these 3",
    //   "width": 224,
    //   "height": 124,
    //   "extent": "parent",
    //   "expandParent": true,
    //   "position": {
    //     "x": 1008,
    //     "y": 180
    //   },
    //   "data": {
    //     "width": 224,
    //     "height": 124,
    //     "id": "47c5f002-327f-4d44-b720-1770f3551846",
    //     "completedAt": null,
    //     "createdAt": "2024-12-01T03:57:15.082483+00:00",
    //     "data": {},
    //     "description": "This is about the milestone",
    //     "dueAt": null,
    //     "identifier": "wait-for-these-3",
    //     "isTemplate": true,
    //     "name": "Wait for these 3",
    //     "parentUowId": "bde381fa-0084-405f-bbe2-73a472b35f1b",
    //     "status": "TEMPLATE",
    //     "tenantId": "d75654b8-444a-4cf2-87ef-44100f825667",
    //     "type": "MILESTONE",
    //     "updatedAt": "2024-12-01T03:57:15.082483+00:00",
    //     "useWorker": true,
    //     "wfId": "0f8967c4-3e7f-4a44-a7fa-c962341275d0",
    //     "workflowError": {},
    //     "workflowHandlerKey": "wait",
    //     "__typename": "Uow"
    //   }
    // },
    // {
    //   "parentNode": "47c5f002-327f-4d44-b720-1770f3551846",
    //   "id": "3e3090ac-96c9-4028-bcdf-91ef93bd2ed2",
    //   "type": "TASK",
    //   "label": "Wait 3-1",
    //   "width": 200,
    //   "height": 100,
    //   "extent": "parent",
    //   "expandParent": true,
    //   "position": {
    //     "x": 12,
    //     "y": 12
    //   },
    //   "data": {
    //     "width": 200,
    //     "height": 100,
    //     "id": "3e3090ac-96c9-4028-bcdf-91ef93bd2ed2",
    //     "completedAt": null,
    //     "createdAt": "2024-12-01T03:57:15.082483+00:00",
    //     "data": {
    //       "afterStepDelay": 1000
    //     },
    //     "description": "Wait a specified number of milliseconds",
    //     "dueAt": null,
    //     "identifier": "wait-3-1",
    //     "isTemplate": true,
    //     "name": "Wait 3-1",
    //     "parentUowId": "47c5f002-327f-4d44-b720-1770f3551846",
    //     "status": "TEMPLATE",
    //     "tenantId": "d75654b8-444a-4cf2-87ef-44100f825667",
    //     "type": "TASK",
    //     "updatedAt": "2024-12-01T03:57:15.082483+00:00",
    //     "useWorker": true,
    //     "wfId": "0f8967c4-3e7f-4a44-a7fa-c962341275d0",
    //     "workflowError": {},
    //     "workflowHandlerKey": "wait",
    //     "__typename": "Uow"
    //   }
    // },
    // {
    //   "parentNode": "bde381fa-0084-405f-bbe2-73a472b35f1b",
    //   "id": "5faaca79-0884-4f54-8717-d0db823d901b",
    //   "type": "TASK",
    //   "label": "Wait first",
    //   "width": 200,
    //   "height": 100,
    //   "extent": "parent",
    //   "expandParent": true,
    //   "position": {
    //     "x": 591,
    //     "y": 40
    //   },
    //   "data": {
    //     "width": 200,
    //     "height": 100,
    //     "id": "5faaca79-0884-4f54-8717-d0db823d901b",
    //     "completedAt": null,
    //     "createdAt": "2024-12-01T03:57:15.082483+00:00",
    //     "data": {
    //       "afterStepDelay": 2000
    //     },
    //     "description": "Wait a specified number of milliseconds",
    //     "dueAt": null,
    //     "identifier": "wait-first",
    //     "isTemplate": true,
    //     "name": "Wait first",
    //     "parentUowId": "bde381fa-0084-405f-bbe2-73a472b35f1b",
    //     "status": "TEMPLATE",
    //     "tenantId": "d75654b8-444a-4cf2-87ef-44100f825667",
    //     "type": "TASK",
    //     "updatedAt": "2024-12-01T03:57:15.082483+00:00",
    //     "useWorker": true,
    //     "wfId": "0f8967c4-3e7f-4a44-a7fa-c962341275d0",
    //     "workflowError": {},
    //     "workflowHandlerKey": "wait",
    //     "__typename": "Uow"
    //   }
    // },
    // {
    //   "parentNode": "bde381fa-0084-405f-bbe2-73a472b35f1b",
    //   "id": "a7054944-6e59-4f02-b3c5-b94c64add4ba",
    //   "type": "MILESTONE",
    //   "label": "Wait for these 2",
    //   style: { backgroundColor: 'rgba(16, 185, 129, 0.5)', width: '200px', height: '200px' },
    //   "width": 444,
    //   "height": 124,
    //   "extent": "parent",
    //   "expandParent": true,
    //   "position": {
    //     "x": 40,
    //     "y": 180
    //   },
    //   "data": {
    //     "width": 444,
    //     "height": 124,
    //     "id": "a7054944-6e59-4f02-b3c5-b94c64add4ba",
    //     "completedAt": null,
    //     "createdAt": "2024-12-01T03:57:15.082483+00:00",
    //     "data": {},
    //     "description": "This is about the milestone",
    //     "dueAt": null,
    //     "identifier": "wait-for-these-2",
    //     "isTemplate": true,
    //     "name": "Wait for these 2",
    //     "parentUowId": "bde381fa-0084-405f-bbe2-73a472b35f1b",
    //     "status": "TEMPLATE",
    //     "tenantId": "d75654b8-444a-4cf2-87ef-44100f825667",
    //     "type": "MILESTONE",
    //     "updatedAt": "2024-12-01T03:57:15.082483+00:00",
    //     "useWorker": true,
    //     "wfId": "0f8967c4-3e7f-4a44-a7fa-c962341275d0",
    //     "workflowError": {},
    //     "workflowHandlerKey": "wait",
    //     "__typename": "Uow"
    //   }
    // },
    // {
    //   "parentNode": "a7054944-6e59-4f02-b3c5-b94c64add4ba",
    //   "id": "b918517b-b400-4ae8-9e1f-55eb67e7a91d",
    //   "type": "TASK",
    //   "label": "Wait 2-1",
    //   "width": 200,
    //   "height": 100,
    //   "extent": "parent",
    //   "expandParent": true,
    //   "position": {
    //     "x": 12,
    //     "y": 12
    //   },
    //   "data": {
    //     "width": 200,
    //     "height": 100,
    //     "id": "b918517b-b400-4ae8-9e1f-55eb67e7a91d",
    //     "completedAt": null,
    //     "createdAt": "2024-12-01T03:57:15.082483+00:00",
    //     "data": {
    //       "afterStepDelay": 4000
    //     },
    //     "description": "Wait a specified number of milliseconds",
    //     "dueAt": null,
    //     "identifier": "wait-2-1",
    //     "isTemplate": true,
    //     "name": "Wait 2-1",
    //     "parentUowId": "a7054944-6e59-4f02-b3c5-b94c64add4ba",
    //     "status": "TEMPLATE",
    //     "tenantId": "d75654b8-444a-4cf2-87ef-44100f825667",
    //     "type": "TASK",
    //     "updatedAt": "2024-12-01T03:57:15.082483+00:00",
    //     "useWorker": true,
    //     "wfId": "0f8967c4-3e7f-4a44-a7fa-c962341275d0",
    //     "workflowError": {},
    //     "workflowHandlerKey": "wait",
    //     "__typename": "Uow"
    //   }
    // },
    // {
    //   "parentNode": "a7054944-6e59-4f02-b3c5-b94c64add4ba",
    //   "id": "d0b63f97-b5bd-4421-95ef-42bf14b328dd",
    //   "type": "TASK",
    //   "label": "Wait 3-2",
    //   "width": 200,
    //   "height": 100,
    //   "extent": "parent",
    //   "expandParent": true,
    //   "position": {
    //     "x": 232,
    //     "y": 12
    //   },
    //   "data": {
    //     "width": 200,
    //     "height": 100,
    //     "id": "d0b63f97-b5bd-4421-95ef-42bf14b328dd",
    //     "completedAt": null,
    //     "createdAt": "2024-12-01T03:57:15.082483+00:00",
    //     "data": {
    //       "afterStepDelay": 500
    //     },
    //     "description": "Wait a specified number of milliseconds",
    //     "dueAt": null,
    //     "identifier": "wait-2-2",
    //     "isTemplate": true,
    //     "name": "Wait 3-2",
    //     "parentUowId": "a7054944-6e59-4f02-b3c5-b94c64add4ba",
    //     "status": "TEMPLATE",
    //     "tenantId": "d75654b8-444a-4cf2-87ef-44100f825667",
    //     "type": "TASK",
    //     "updatedAt": "2024-12-01T03:57:15.082483+00:00",
    //     "useWorker": true,
    //     "wfId": "0f8967c4-3e7f-4a44-a7fa-c962341275d0",
    //     "workflowError": {},
    //     "workflowHandlerKey": "wait",
    //     "__typename": "Uow"
    //   }
    // },
    {
      // "parentNode": "bde381fa-0084-405f-bbe2-73a472b35f1b",
      "id": "6795250f-4703-472c-95a1-b24e9f6a03b8",
      "type": "MILESTONE",
      style: { backgroundColor: 'rgba(16, 185, 129, 0.5)', width: '200px', height: '200px' },
      // "width": 444,
      // "height": 124,
      "extent": "parent",
      "expandParent": true,
      "position": {
        "x": 524,
        "y": 180
      },
      "data": {
        "label": "Wait for these 1",
        "width": 444,
        "height": 124,
        "id": "6795250f-4703-472c-95a1-b24e9f6a03b8",
        "completedAt": null,
        "createdAt": "2024-12-01T03:57:15.082483+00:00",
        "data": {},
        "description": "This is about the milestone",
        "dueAt": null,
        "identifier": "wait-for-these-1",
        "isTemplate": true,
        "name": "Wait for these 1",
        "parentUowId": "bde381fa-0084-405f-bbe2-73a472b35f1b",
        "status": "TEMPLATE",
        "tenantId": "d75654b8-444a-4cf2-87ef-44100f825667",
        "type": "MILESTONE",
        "updatedAt": "2024-12-01T03:57:15.082483+00:00",
        "useWorker": true,
        "wfId": "0f8967c4-3e7f-4a44-a7fa-c962341275d0",
        "workflowError": {},
        "workflowHandlerKey": "wait",
        "__typename": "Uow"
      }
    },
    {
      "parentNode": "6795250f-4703-472c-95a1-b24e9f6a03b8",
      "id": "9f204fda-695c-4377-87d2-4f8438570920",
      "type": "TASK",
        "width": 200,
      "height": 100,
      "extent": "parent",
      "expandParent": true,
      "position": {
        "x": 12,
        "y": 12
      },
      "data": {
        "label": "Wait 1-1",
        "width": 200,
        "height": 100,
        "id": "9f204fda-695c-4377-87d2-4f8438570920",
        "completedAt": null,
        "createdAt": "2024-12-01T03:57:15.082483+00:00",
        "data": {
          "afterStepDelay": 2000
        },
        "description": "Wait a specified number of milliseconds",
        "dueAt": null,
        "identifier": "wait-1-1",
        "isTemplate": true,
        "name": "Wait 1-1",
        "parentUowId": "6795250f-4703-472c-95a1-b24e9f6a03b8",
        "status": "TEMPLATE",
        "tenantId": "d75654b8-444a-4cf2-87ef-44100f825667",
        "type": "TASK",
        "updatedAt": "2024-12-01T03:57:15.082483+00:00",
        "useWorker": true,
        "wfId": "0f8967c4-3e7f-4a44-a7fa-c962341275d0",
        "workflowError": {},
        "workflowHandlerKey": "wait",
        "__typename": "Uow"
      }
    },
    {
      "parentNode": "6795250f-4703-472c-95a1-b24e9f6a03b8",
      "id": "a925b3b1-8f71-436c-b8c0-ffd4b96a1669",
      "type": "TASK",
      "width": 200,
      "height": 100,
      "extent": "parent",
      "expandParent": true,
      "position": {
        "x": 232,
        "y": 12
      },
      "data": {
        "label": "Wait 1-2",
        "width": 200,
        "height": 100,
        "id": "a925b3b1-8f71-436c-b8c0-ffd4b96a1669",
        "completedAt": null,
        "createdAt": "2024-12-01T03:57:15.082483+00:00",
        "data": {
          "afterStepDelay": 2000
        },
        "description": "Wait a specified number of milliseconds",
        "dueAt": null,
        "identifier": "wait-1-2",
        "isTemplate": true,
        "name": "Wait 1-2",
        "parentUowId": "6795250f-4703-472c-95a1-b24e9f6a03b8",
        "status": "TEMPLATE",
        "tenantId": "d75654b8-444a-4cf2-87ef-44100f825667",
        "type": "TASK",
        "updatedAt": "2024-12-01T03:57:15.082483+00:00",
        "useWorker": true,
        "wfId": "0f8967c4-3e7f-4a44-a7fa-c962341275d0",
        "workflowError": {},
        "workflowHandlerKey": "wait",
        "__typename": "Uow"
      }
    },
    // {
    //   id: '2',
    //   data: { label: 'parent node 2' },
    //   position: { x: 100, y: 100 },
    //   style: { backgroundColor: 'rgba(16, 185, 129, 0.5)', width: '200px', height: '200px' },
    // },
    // {
    //   id: '999',
    //   type: 'input',
    //   data: { label: 'Drag me to extend area!' },
    //   position: { x: 20, y: 100 },
    //   class: 'light',
    //   expandParent: true,
    //   parentNode: '2',
    // },
  ]
)

const edges = ref([
    {
      "id": "086731ca-ffa2-496f-b97f-dfdf6a53ab2f",
      "source": "6795250f-4703-472c-95a1-b24e9f6a03b8",
      "target": "2af36eef-9a4c-48e4-b329-9d631c7e60b8",
      "animated": true,
      "markerEnd": "arrowclosed"
    },
    {
      "id": "22563f64-5b54-43ba-bfe1-4d380d17052c",
      "source": "47c5f002-327f-4d44-b720-1770f3551846",
      "target": "2af36eef-9a4c-48e4-b329-9d631c7e60b8",
      "animated": true,
      "markerEnd": "arrowclosed"
    },
    {
      "id": "69d4781e-3653-4f6b-8c21-28a56b32243b",
      "source": "5faaca79-0884-4f54-8717-d0db823d901b",
      "target": "a7054944-6e59-4f02-b3c5-b94c64add4ba",
      "animated": true,
      "markerEnd": "arrowclosed"
    },
    {
      "id": "c3887099-f3ff-4aca-a5d1-eb0a33fb7789",
      "source": "b918517b-b400-4ae8-9e1f-55eb67e7a91d",
      "target": "d0b63f97-b5bd-4421-95ef-42bf14b328dd",
      "animated": true,
      "markerEnd": "arrowclosed"
    },
    {
      "id": "c41a47f2-2bf9-4219-b051-4d8fb15def4a",
      "source": "5faaca79-0884-4f54-8717-d0db823d901b",
      "target": "6795250f-4703-472c-95a1-b24e9f6a03b8",
      "animated": true,
      "markerEnd": "arrowclosed"
    },
    {
      "id": "d9bcb5b9-4cd0-46b2-bc71-2c76addf100c",
      "source": "a7054944-6e59-4f02-b3c5-b94c64add4ba",
      "target": "2af36eef-9a4c-48e4-b329-9d631c7e60b8",
      "animated": true,
      "markerEnd": "arrowclosed"
    },
    {
      "id": "ddc47ab5-9231-44ec-ae5c-f8cf0bcb331b",
      "source": "5faaca79-0884-4f54-8717-d0db823d901b",
      "target": "47c5f002-327f-4d44-b720-1770f3551846",
      "animated": true,
      "markerEnd": "arrowclosed"
    },
    {
      "id": "fe1b203d-4548-4984-bed7-b701211effa1",
      "source": "9f204fda-695c-4377-87d2-4f8438570920",
      "target": "a925b3b1-8f71-436c-b8c0-ffd4b96a1669",
      "animated": true,
      "markerEnd": "arrowclosed"
    }
  ])
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" fit-view-on-init elevate-edges-on-select>
    <template #node-TASK="uow">
      <TaskNode
        :uow="uow"
        @click="onUowSelected(uow)"
      />
    </template>

    <MiniMap />

    <Controls />

    <Background />
  </VueFlow>
</template>

<style lang="css" scoped>
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.41.5/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/core@1.41.5/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/node-resizer@latest/dist/style.css';


html,
body,
#app {
  margin: 0;
  height: 100%;
}

#app {
  text-transform: uppercase;
  font-family: 'JetBrains Mono', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.vue-flow__minimap {
  transform: scale(75%);
  transform-origin: bottom right;
}

</style>
