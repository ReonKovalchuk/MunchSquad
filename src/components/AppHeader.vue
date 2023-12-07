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
    <div class="container header__container">
      <Slide class="burger" role="навигация">
        <app-search @selected="navigate"></app-search>
        <RouterLink to="/recipes" class="header__nav-link" tabindex="0"> Рецепты </RouterLink>
        <RouterLink to="/restaurants" class="header__nav-link" tabindex="0"> Рестораны </RouterLink>
        <app-login></app-login>
      </Slide>
      <app-logo></app-logo>
      <div class="header__nav-group" role="навигациы">
        <div class="header__nav-wrapper">
          <nav>
            <RouterLink to="/recipes" class="header__nav-link" tabindex="0"> Рецепты </RouterLink>
            <RouterLink to="/restaurants" class="header__nav-link" tabindex="0">
              Рестораны
            </RouterLink>
          </nav>
        </div>
        <app-search @selected="navigate"></app-search>
        <app-login></app-login>
      </div>
    </div>
  </header>
</template>
