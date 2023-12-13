<script setup>
import AppHero from '@/components/AppHero.vue'
</script>
<template>
  <app-hero />
  <div class="container">
    <h1>Страница не найдена</h1>
  </div>
</template>
<style scoped>
.container {
  display: flex;
}
h1 {
  margin: 100px auto;
  font-weight: normal;
  font-size: 48px;
}
</style>
