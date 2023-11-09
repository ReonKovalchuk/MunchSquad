<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useSearchStore } from '@/stores/search'
// import { storeToRefs } from 'pinia'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
let auth
const isLoggedIn = ref(false)
onMounted(async () => {
  const searchStore = useSearchStore()
  await searchStore.getSearchData()

  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})
</script>

<template>
  <app-header :is-logged-in="isLoggedIn">
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
