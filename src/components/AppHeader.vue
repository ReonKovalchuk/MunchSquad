<script setup>
import AppSearch from './AppSearch.vue'
import AppLogin from './AppLogin.vue'
import AppLogo from './AppLogo.vue'
import { Slide } from 'vue3-burger-menu'
import { useRouter } from 'vue-router'
import { isRecipe } from '@/functions'

const router = useRouter()
function navigate(item) {
  router.push(`/${isRecipe(item.id) ? 'recipes' : 'restaurants'}/${item.id}`)
}
</script>
<template>
  <header class="header">
    <div class="container">
      <Slide>
        <app-search></app-search>
        <app-logo></app-logo>
        <!-- <nav class="burger-nav"> -->
        <RouterLink to="/recipes" class="header__nav-link">Рецепты</RouterLink>
        <RouterLink to="/restaurants" class="header__nav-link">Рестораны</RouterLink>
        <!-- </nav> -->
        <app-login></app-login>
      </Slide>
      <div class="header__container">
        <app-logo></app-logo>

        <div class="header__nav-wrapper">
          <nav>
            <RouterLink to="/recipes" class="header__nav-link">Рецепты</RouterLink>
            <RouterLink to="/restaurants" class="header__nav-link">Рестораны</RouterLink>
          </nav>
        </div>
        <app-search @selected="navigate"></app-search>
        <app-login></app-login>
      </div>
    </div>
  </header>
</template>
