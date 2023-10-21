import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe, Course } from '@/types/types'
import { CourseEnum } from '@/types/types'

export const useRecipesStore = defineStore('recipes', () => {
  function getRecipes() {
    try {
      // @ts-ignore
      return JSON.parse(window.localStorage.getItem('recipes')) || []
    } catch (error) {
      console.log('ошибка при получении данных из хранилища:', error)
      return []
    }
  }
  const recipes = ref<Recipe[]>(getRecipes())
  const courceOptions = computed(() => {
    return Object.keys(CourseEnum).filter((v) => isNaN(Number(v)))
  })
  function addNewRecipe(recipe: Recipe) {
    const saved = getRecipes()

    saved.push({
      id: Date.now().toString(),
      link: recipe.link,
      name: recipe.name,
      course: recipe.course,
      linkToImage: recipe.linkToImage
    })
    window.localStorage.setItem('recipes', JSON.stringify(saved))
    recipes.value = saved
  }

  function removeRecipe(id: string) {
    const res = recipes.value.filter((recipe) => {
      return recipe.id !== id
    })
    window.localStorage.setItem('recipes', JSON.stringify(res))
    recipes.value = res
  }

  function filterRecipesbyCourse(value: Course) {
    return recipes.value.filter((recipe) => {
      return recipe.course === value
    })
  }

  function findRecipeById(id: string) {
    const res = recipes.value.find((recipe) => {
      return recipe.id === id
    })
    return res
  }

  // function editRecipe(id: string, recipe) {}
  return {
    recipes,
    courceOptions,
    addNewRecipe,
    removeRecipe,
    findRecipeById,
    filterRecipesbyCourse
  }
})
