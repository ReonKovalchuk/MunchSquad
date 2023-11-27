<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { watch, onMounted, ref } from 'vue'
import { useSearchStore } from '@/stores/search'
import { useUserInfoStore } from '@/stores/userInfo'
import { useRecipesStore } from '@/stores/recipes'
import { useRestaurantsStore } from '@/stores/restaurants'
import { usePlannerStore } from '@/stores/planner'
import { useFSRefsStore } from './stores/FSRefs'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { storeToRefs } from 'pinia'
import type { PlannerDay, Recipe, Restaurant } from '@/types/types'
import { readQuerySnapshot } from './functions'
import type { QuerySnapshot } from '@firebase/firestore'
import { onSnapshot } from '@firebase/firestore'
import { useRoute } from 'vue-router'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const route = useRoute()

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
  onSnapshot(colRefs.value.plannerColRef, (querySnapshot: QuerySnapshot) => {
    planner.value = readQuerySnapshot(querySnapshot) as PlannerDay[]
    searchStore.getSearchData()
  })
  onSnapshot(colRefs.value.recipesColRef, (querySnapshot) => {
    recipes.value = readQuerySnapshot(querySnapshot) as Recipe[]
    searchStore.getSearchData()
  })
  onSnapshot(colRefs.value.restaurantsColRef, (querySnapshot) => {
    restaurants.value = readQuerySnapshot(querySnapshot) as Restaurant[]
    searchStore.getSearchData()
  })
})
const scroll = ref()
watch(route, () => {
  if (scroll.value) {
    scroll.value.scrollTop = 0
  }
})
</script>

<template>
  <perfect-scrollbar ref="scroll">
    <app-header>
      <template v-slot:navigation>
        <nav>
          <RouterLink to="/" class="header__nav-link">Планировщик</RouterLink>
          <RouterLink to="/recipes" class="header__nav-link">Рецепты</RouterLink>
          <RouterLink to="/restaurants" class="header__nav-link">Рестораны</RouterLink>
        </nav>
      </template>
    </app-header>

    <main>
      <Suspense>
        <RouterView />
      </Suspense>
    </main>

    <app-footer></app-footer>
  </perfect-scrollbar>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.ps {
  max-height: 100vh;
}
</style>
