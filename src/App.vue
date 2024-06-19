<script setup lang="ts">
import ModeToggle from "@/components/ModeToggle.vue"
</script>
<template>
  <main class="w-screen h-screen">
    <div class="absolute top-1 right-1 md:top-4 md:right-4">
      <ModeToggle />
    </div>
    <div class="pt-14 px-1.5">
      <RouterView />
    </div>
  </main>
</template>
