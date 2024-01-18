import { useRecipesStore } from './recipes'
import { useRestaurantsStore } from './restaurants'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe, Restaurant } from '@/types/types'

export const useSearchStore = defineStore('search', () => {
  const searchData = ref<Recipe | Restaurant[]>([])
  const loading = ref(false)
  function getSearchData() {
    loading.value = true
    const recipesStore = useRecipesStore()
    const { recipes } = storeToRefs(recipesStore)
    const restaurantsStore = useRestaurantsStore()
    const { restaurants } = storeToRefs(restaurantsStore)

    searchData.value = [...recipes.value, ...restaurants.value]
    loading.value = false
  }
  function $reset() {
    loading.value = false
    searchData.value = []
  }
  return {
    searchData,
    loading,
    getSearchData,
    $reset
  }
})
