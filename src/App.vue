<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onBeforeMount } from 'vue'
import { useSearchStore } from '@/stores/search'
// import { storeToRefs } from 'pinia'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

onBeforeMount(async () => {
  const searchStore = useSearchStore()
  await searchStore.getSearchData()
})
</script>

<template>
  <app-header>
    <template v-slot:navigation>
      <nav>
        <RouterLink to="/" class="header__nav-link">Планировщик</RouterLink>
        <RouterLink to="/recipes" class="header__nav-link">Рецепты</RouterLink>
        <RouterLink to="/restaurants" class="header__nav-link">Рестораны</RouterLink>
      </nav>
    </template>
  </app-header>
  <Suspense>
    <RouterView />
  </Suspense>
  <app-footer></app-footer>
</template>

<style></style>
