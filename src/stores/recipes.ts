import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { firestore } from '@/firebase/init'
import {
  doc,
  collection,
  setDoc,
  deleteDoc,
  getDocs,
  getDoc,
  CollectionReference
} from 'firebase/firestore'
import type { Recipe, Course } from '@/types/types'
import { CourseEnum } from '@/types/types'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'
import { readQuerySnapshot } from '@/functions'
import { useFSRefsStore } from './FSRefs'

export const useRecipesStore = defineStore('recipes', () => {
  const loading = ref(false)
  const recipes = ref<Recipe[]>([])
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)
  const { colRefs } = storeToRefs(useFSRefsStore())
  async function getRecipes() {
    loading.value = true
    const querySnapshot = await getDocs(colRefs.value.recipesColRef)
    loading.value = false
    recipes.value = <Recipe[]>readQuerySnapshot(querySnapshot)
    console.log('recipes now have', recipes.value)
  }

  const courseOptions = computed(() => {
    return Object.keys(CourseEnum).filter((v) => isNaN(Number(v)))
  })

  async function addNewRecipe(recipe: Recipe) {
    recipe.id = 'rec' + Date.now().toString()

    console.log(colRefs.value.recipesColRef.path)
    await setDoc(doc(colRefs.value.recipesColRef, recipe.id), recipe)
  }

  async function removeRecipe(id: string) {
    await deleteDoc(doc(colRefs.value.recipesColRef, id))
  }

  function filterRecipesbyCourse(recipes: Recipe[], value: Course) {
    return recipes.filter((recipe) => {
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
    loading,
    courseOptions,
    getRecipes,
    addNewRecipe,
    removeRecipe,
    findRecipeById,
    filterRecipesbyCourse,
    editRecipe
  }
})
