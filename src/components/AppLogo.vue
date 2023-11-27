<script setup>
import LogoIcon from './icons/LogoIcon.vue'
</script>

<template>
  <div class="logo__group"><logo-icon></logo-icon> <span class="logo__text">Munch squad</span></div>
</template>

<style>
.logo__group {
  display: flex;
  gap: 12px;
  align-items: center;
}
.logo__text {
  font-size: 26px;
}
</style>
