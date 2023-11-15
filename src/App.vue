<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useSearchStore } from '@/stores/search'
import { useUserInfoStore } from '@/stores/userInfo'
import { useRecipesStore } from '@/stores/recipes'
import { useRestaurantsStore } from '@/stores/restaurants'
import { usePlannerStore } from '@/stores/planner'
// import { storeToRefs } from 'pinia'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

onMounted(() => {
  const userInfoStore = useUserInfoStore()
  const searchStore = useSearchStore()
  const recipesStore = useRecipesStore()
  const restaurantsStore = useRestaurantsStore()
  const plannerStore = usePlannerStore()
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    userInfoStore.getUserInfo(user)
    await searchStore.getSearchData()
    await recipesStore.getRecipes()
    await restaurantsStore.getRestaurants()
    await plannerStore.getPlannerData()
  })
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
    <main>
      <RouterView />
    </main>
  </Suspense>
  <app-footer></app-footer>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
