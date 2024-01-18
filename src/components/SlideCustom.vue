<template>
  <div class="slide-wrapper">
    <p class="slide-text">{{ slideText }}</p>
    <img :src="slideImage" class="slide-image" />
  </div>
</template>
<script setup>
const { slideImage, slideText } = defineProps(['slideImage', 'slideText'])
</script>
<style></style>
