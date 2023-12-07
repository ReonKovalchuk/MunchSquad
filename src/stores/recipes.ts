import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore'
import type { Recipe, Course } from '@/types/types'
import { CourseEnum } from '@/types/types'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'
import { readQuerySnapshot } from '@/functions'
import { useFSRefsStore } from './FSRefs'

export const useRecipesStore = defineStore('recipes', () => {
  const loadingRec = ref(false)
  const recipes = ref<Recipe[]>([])
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)
  const { colRefs } = storeToRefs(useFSRefsStore())

  async function getRecipes() {
    loadingRec.value = true
    const querySnapshot = await getDocs(colRefs.value.recipesColRef)
    loadingRec.value = false
    recipes.value = <Recipe[]>readQuerySnapshot(querySnapshot)
  }

  const courseOptions = computed(() => {
    return Object.keys(CourseEnum).filter((v) => isNaN(Number(v)))
  })

  async function addNewRecipe(recipe: Recipe) {
    recipe.id = 'rec' + Date.now().toString()

    await setDoc(doc(colRefs.value.recipesColRef, recipe.id), recipe)
  }

  async function removeRecipe(id: string) {
    await deleteDoc(doc(colRefs.value.recipesColRef, id))
  }

  function filterRecipesbyCourse(value: string) {
    return recipes.value.filter((recipe) => {
      return recipe.course === value
    })
  }

  function findRecipeById(id: string) {
    const res = recipes.value.find((recipe) => {
      return recipe.id === id
    })
    return res ? res : ({ id: '', uid: userInfo.value.uid } as Recipe)
  }

  async function editRecipe(id: string, newData: Recipe) {
    const recipeRef = doc(colRefs.value.recipesColRef, id)
    await setDoc(recipeRef, newData, { merge: true })
  }

  return {
    recipes,
    loadingRec,
    courseOptions,
    getRecipes,
    addNewRecipe,
    removeRecipe,
    findRecipeById,
    filterRecipesbyCourse,
    editRecipe
  }
})
