<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useSearchStore } from '@/stores/search'
import { useUserInfoStore } from '@/stores/userInfo'
import { useRecipesStore } from '@/stores/recipes'
import { useRestaurantsStore } from '@/stores/restaurants'
import { usePlannerStore } from '@/stores/planner'
import { useFSRefsStore } from './stores/FSRefs'
// import { storeToRefs } from 'pinia'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { storeToRefs } from 'pinia'
import type { PlannerDay, Recipe, Restaurant } from '@/types/types'
import { firestore } from '@/firebase/init'
import { collection, onSnapshot } from 'firebase/firestore'
import { readQuerySnapshot } from './functions'

onMounted(async () => {
  const userInfoStore = useUserInfoStore()
  const searchStore = useSearchStore()
  const recipesStore = useRecipesStore()
  const restaurantsStore = useRestaurantsStore()
  const plannerStore = usePlannerStore()
  const FSRefsStore = useFSRefsStore()
  const auth = getAuth()
  userInfoStore.init(auth.currentUser)
  FSRefsStore.init()
  onAuthStateChanged(auth, async (user) => {
    userInfoStore.init(user)
    FSRefsStore.init()
    console.log('getting recipes')
    await recipesStore.getRecipes()
    console.log('getting restaurants')
    await restaurantsStore.getRestaurants()
    console.log('getting planner')
    await plannerStore.getPlannerData()
    console.log('getting search')
    searchStore.getSearchData()
  })
  const { colRefs } = storeToRefs(FSRefsStore)
  const { planner } = storeToRefs(plannerStore)
  const { recipes } = storeToRefs(recipesStore)
  const { restaurants } = storeToRefs(restaurantsStore)
  onSnapshot(colRefs.value.plannerColRef, (querySnapshot) => {
    planner.value = <PlannerDay[]>readQuerySnapshot(querySnapshot)
    searchStore.getSearchData()
  })
  onSnapshot(colRefs.value.recipesColRef, (querySnapshot) => {
    recipes.value = <Recipe[]>readQuerySnapshot(querySnapshot)
    searchStore.getSearchData()
  })
  onSnapshot(colRefs.value.restaurantsColRef, (querySnapshot) => {
    restaurants.value = <Restaurant[]>readQuerySnapshot(querySnapshot)
    searchStore.getSearchData()
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
