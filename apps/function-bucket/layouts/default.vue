<template>
  <div class="relative flex min-h-screen flex-col justify-center overflow-hidden">
    <div class="flex">
      <ClientOnly>
        <menu-bar></menu-bar>
      </ClientOnly>
    </div>
    <div class="flex grow items-stretch">
      <div class="flex flex-col">
        <TheNav />
      </div>
      <div class="flex flex-col grow items-stretch">
        <slot />      
      </div>
    </div>
  </div>
</template>
