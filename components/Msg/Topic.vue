<template>
  <UCard v-if="topic" class="grow">
    <template #header>
      <div class="flex justify-center">{{ title || topic.name }}</div>
    </template>
    <div class="flex flex-col gap-1.5">
      <div class="flex gap-1">
        <div class="flex grow">
          <UTextarea
            v-model="content"
            :ui="{
              wrapper: 'flex grow'
            }"
          ></UTextarea>
        </div>
        <UButton 
          @click="handleSendMessage"
          :disabled="sendDisabled"
        >Send</UButton>
      </div>
      <div v-for="m in preppedMessages" class="flex flex-col">
        <div :class="m.display.topicContainer">
          <div :class="m.display.msgContainer">
            <div :class="m.display.displayName">{{ m.postedBy.displayName }}</div>
            <div :class="m.display.createdAt">{{ useFormatDateTimeString(m.createdAt) }}</div>
            <div :class="m.display.content">
              {{ m.content }}
              <!-- <UTextarea
                :model-value="m.content"
                :textarea-class="m.display.textArea"
                :variant="'outline'"
                color="bg-green-400"
              /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    topicId: string,
    title?: string
  }>()
  const { currentProfileClaims } = storeToRefs(useAppStateStore())
  const { data } = await useDiscussionByIdQuery({
    variables: {
      topicId: props.topicId
    }
  })
  const topic = ref(data.value?.topic)
  const content = ref('')

  // const subscribeToTopic = async () => {
  //   const result = GqlTopicMessage({
  //     topicId: props.topicId
  //   })
  //   console.log('result', result)
    
  //   result.subscribe({
  //     next({ data }) {
  //       if (data) {
  //         console.log("We got something!", data);
  //       }
  //     },
  //   });
  // }
  // subscribeToTopic()

  const preppedMessages = computed(() => {
    return topic.value?.messages.map((m: any) => {
      const side = currentProfileClaims.value.displayName === m.postedBy.displayName ? 'right' : 'left'
      return {
        ...m,
        display: {
          topicContainer: side === 'right' ? 'flex justify-end' : 'flex justify-start',
          msgContainer: side === 'right' ? 'flex flex-col w-3/4 gap-0.5 justify-end' :  'flex flex-col w-3/4 gap-0.5 justify-start',
          displayName: side === 'right' ? 'flex text-sm font-bold justify-end' :  'flex text-sm font-bold justify-start',
          createdAt: side === 'right' ? 'flex text-xs italic justify-end' :  'flex text-xs italic justify-start',
          content: side === 'right' ? 'flex p-1 rounded grow break-normal justify-end bg-green-400' :  'flex p-1 rounded grow break-normal justify-start bg-blue-400',
          textArea: side === 'right' ? 'bg-green-400 flex flex-grow' :  'bg-blue-400 flex flex-grow',
        }
      }
    })
    .sort((a:Message,b:Message) => a.createdAt > b.createdAt ? -1 : 1)
  })

  const sendDisabled = computed(()=>{
    return content.value?.length === 0
  })

  const sendMessageMutation = useUpsertMessageMutation()
  const handleSendMessage = async () => {
    if (!topic.value?.id) return;
    await sendMessageMutation.executeMutation({
      messageInfo: {
        topicId: topic.value.id,
        content: content.value
      }
    })
    content.value = ''
  }
  </script>
