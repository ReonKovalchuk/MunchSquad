<script setup>
import LogoIcon from './icons/LogoIcon.vue'
</script>

<template>
  <RouterLink to="/">
    <div class="logo__group" title="На главную" aria-label="На главную">
      <logo-icon></logo-icon> <span class="logo__text">Munch squad</span>
    </div>
  </RouterLink>
</template>

<style>
.logo__group {
  display: flex;
  gap: 12px;
  align-items: center;
  line-height: 1;
}
.logo__text {
  font-size: 26px;
  white-space: nowrap;
}
</style>
