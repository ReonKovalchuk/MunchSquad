<template>
  <div class="slide-wrapper">
    <p class="slide-text">{{ slideText }}</p>
    <img :src="slideImage" class="slide-image" />
  </div>
</template>
<script setup>
const { slideImage, slideText } = defineProps(['slideImage', 'slideText'])
</script>
<style>
.slide-wrapper {
  display: flex;
  align-items: center;
  padding-bottom: 50px;
  gap: 24px;
  background-color: #fff;
  flex-wrap: wrap;
  justify-content: center;
}
.slide-image {
  max-width: 1000px;
  min-width: 250px;
}
.slide-text {
  display: inline;
  font-size: 30px;
}
</style>
