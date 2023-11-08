import { getRecipes } from './recipesData'
import { getRestaurants } from './restaurantsData'

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const searchData = ref([])
  const loading = ref(false)
  async function getSearchData() {
    loading.value = true
    const recipes = await getRecipes()
    const restaurants = await getRestaurants()
    searchData.value = [...recipes, ...restaurants]
    loading.value = false
  }
  return {
    searchData,
    loading,
    getSearchData
  }
})
