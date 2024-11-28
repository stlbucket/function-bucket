<template>
  <pre>{{ layout }}</pre>
</template>

<script lang="ts" setup>
import ELK from 'elkjs/lib/elk.bundled.js'
const elk = new ELK()

const elkInput = {
  "layoutOptions": {
    "elk.algorithm": "layered"
  },
  "id": "726823fb-56e2-44c1-bf10-91ce5e171933",
  "width": 200,
  "height": 100,
  "type": "WF",
  "label": "Workflow Exerciser",
  "style": {},
  "children": [
    {
      "id": "3e9324b1-0639-4395-9664-59b6fb79411c",
      "width": 200,
      "height": 100,
      "type": "MILESTONE",
      "label": "Do the things",
      "style": {},
      "children": [
        {
          "id": "37793f3e-80b3-456d-b742-9229e0eaee8c",
          "width": 200,
          "height": 100,
          "type": "TASK",
          "label": "Get a stock quote",
          "style": {},
          "children": []
        },
        {
          "id": "b7e5531a-0197-439e-88b9-e572335e8919",
          "width": 200,
          "height": 100,
          "type": "TASK",
          "label": "Maybe raise an exception",
          "style": {},
          "children": []
        },
        {
          "id": "dedc9e24-07bf-4a32-b3a4-5304d9620c9d",
          "width": 200,
          "height": 100,
          "type": "TASK",
          "label": "Maybe throw an error",
          "style": {},
          "children": []
        }
      ]
    },
    {
      "id": "af10fe96-858d-47c3-9867-ab5cb2af8a24",
      "width": 200,
      "height": 100,
      "type": "TASK",
      "label": "Init Workflow Exerciser",
      "style": {},
      "children": []
    },
    {
      "id": "bbaa73f2-2e6b-4668-a546-51bd5aefcdd3",
      "width": 200,
      "height": 100,
      "type": "TASK",
      "label": "Finish Workflow Exerciser",
      "style": {},
      "children": []
    }
  ],
  "edges": [
      {
        "id": "15494e1f-8ff0-4453-8973-836de055337a",
        "sources": [
          "3e9324b1-0639-4395-9664-59b6fb79411c"
        ],
        "targets": [
          "af10fe96-858d-47c3-9867-ab5cb2af8a24"
        ]
      },
      {
        "id": "4c47f8a2-3999-408a-ae01-4025d512738c",
        "sources": [
          "bbaa73f2-2e6b-4668-a546-51bd5aefcdd3"
        ],
        "targets": [
          "3e9324b1-0639-4395-9664-59b6fb79411c"
        ]
      },
      {
        "id": "73c48f12-fcfe-4264-973a-93a5d0f3af01",
        "sources": [
          "b7e5531a-0197-439e-88b9-e572335e8919"
        ],
        "targets": [
          "dedc9e24-07bf-4a32-b3a4-5304d9620c9d"
        ]
      },
      {
        "id": "cca3c1ed-f02b-4b44-84da-596ed36b1835",
        "sources": [
          "dedc9e24-07bf-4a32-b3a4-5304d9620c9d"
        ],
        "targets": [
          "37793f3e-80b3-456d-b742-9229e0eaee8c"
        ]
      }
  ]
}


const layout = await elk.layout(elkInput)

</script>