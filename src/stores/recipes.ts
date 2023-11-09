import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe, Course } from '@/types/types'
import { CourseEnum } from '@/types/types'
// import axios from 'axios'

import { firestore } from '@/firebase/init'
import { doc, collection, setDoc, deleteDoc, getDocs } from 'firebase/firestore'
// const BASE_URL = 'http://localhost:3000/recipes'
// const colRef = collection(firestore, 'recipes')
export const useRecipesStore = defineStore('recipes', async () => {
  const loading = ref(false)
  export async function getRecipes() {
    loading.value = true
    const firestoreData = <Recipe[]>[]
    const querySnapshot = await getDocs(collection(firestore, 'recipes'))
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      firestoreData.push({ id: doc.id, ...doc.data() })
    })
    loading.value = false
    return firestoreData
  }

  const courceOptions = Object.keys(CourseEnum).filter((v) => isNaN(Number(v)))

  async function addNewRecipe(recipe: Recipe) {
    await setDoc(doc(firestore, 'recipes', 'rec' + Date.now().toString()), recipe)
  }

  async function removeRecipe(id: string) {
    await deleteDoc(doc(firestore, 'recipes', id))
  }

  function filterRecipesbyCourse(recipes: Recipe[], value: Course) {
    return recipes.filter((recipe) => {
      return recipe.course === value
    })
  }

  async function findRecipeById(id: string) {
    const docRef = doc(firestore, 'recipes', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { id, ...docSnap.data() }
    } else {
      console.log('No such document!')
      return {}
    }
  }

  async function editRecipe(id: string, newData: Recipe) {
    const recipeRef = doc(firestore, 'recipes', id)
    await setDoc(recipeRef, newData, { merge: true })
  }

  return {
    recipes,
    courceOptions,
    getRecipes,
    addNewRecipe,
    removeRecipe,
    findRecipeById,
    filterRecipesbyCourse,
    editRecipe
  }
})
