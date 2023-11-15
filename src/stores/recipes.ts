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
  query,
  where
} from 'firebase/firestore'
import type { Recipe, Course } from '@/types/types'
import { CourseEnum } from '@/types/types'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'

const colRef = collection(firestore, 'recipes')
export const useRecipesStore = defineStore('recipes', () => {
  const loading = ref(false)
  const recipes = ref<Recipe[]>([])
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)

  async function getRecipes() {
    loading.value = true

    const firestoreData = <Recipe[]>[]
    const q = query(colRef, where('uid', '==', userInfo.value.uid))
    //const querySnapshot = await getDocs(collection(firestore, 'recipes'))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc: any) => {
      // doc.data() is never undefined for query doc snapshots
      firestoreData.push({ id: doc.id, ...doc.data() })
    })
    loading.value = false
    recipes.value = firestoreData
  }

  const courseOptions = computed(() => {
    return Object.keys(CourseEnum).filter((v) => isNaN(Number(v)))
  })

  async function addNewRecipe(recipe: Recipe) {
    recipe.id = 'rec' + Date.now().toString()
    await setDoc(doc(firestore, 'recipes', recipe.id), recipe)
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
      return { ...docSnap.data() } as Recipe
    } else {
      console.log(`No document with id ${id}!`)
      return { id: '', uid: userInfo.value.uid } as Recipe
    }
  }

  async function editRecipe(id: string, newData: Recipe) {
    const recipeRef = doc(firestore, 'recipes', id)
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
