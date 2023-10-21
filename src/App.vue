<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <app-header>
    <template v-slot:navigation>
      <nav>
        <RouterLink to="/" class="header__nav-link">Планировщик</RouterLink>
        <RouterLink to="/recipes" class="header__nav-link">Рецепты</RouterLink>
        <!-- <RouterLink to="/recipes">Рецепты</RouterLink> -->
        <RouterLink to="/restaurants" class="header__nav-link">Рестораны</RouterLink>
      </nav>
    </template>
  </app-header>

  <RouterView />

  <app-footer></app-footer>
</template>

<style></style>
