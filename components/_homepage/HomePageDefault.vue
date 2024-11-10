<template>
  <UCard>
    <template #header>
      <div class="flex justify-center text-2xl">DEFAULT USER HOME PAGE</div>
    </template>
    <div class="flex flex-col gap-3">
      <div class="flex justify-center">This is the default home page for the base application</div>
      <div class="flex justify-center">Only users of the anchor tenant should ever see this homepage, and only when they are working in the base context.</div>
    </div>
  </UCard>
</template>

<script lang="ts" setup></script>