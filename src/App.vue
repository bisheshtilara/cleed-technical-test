<script setup lang="ts">
import ModeToggle from "@/components/ModeToggle.vue"
</script>
<template>
  <main class="w-screen h-screen">
    <ModeToggle />
    <RouterView />
  </main>
</template>
