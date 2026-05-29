<template>
  <h1 class="glitch" :data-text="text">{{ text }}</h1>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>
