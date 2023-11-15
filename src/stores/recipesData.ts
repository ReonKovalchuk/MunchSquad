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

export async function getRecipes() {
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)
  const firestoreData = <Recipe[]>[]
  const q = query(colRef, where('uid', '==', userInfo.value.uid))
  //const querySnapshot = await getDocs(collection(firestore, 'recipes'))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc: any) => {
    // doc.data() is never undefined for query doc snapshots
    firestoreData.push({ id: doc.id, ...doc.data() })
  })
  return firestoreData
}

export function getCourceOptions() {
  return Object.keys(CourseEnum).filter((v) => isNaN(Number(v)))
}

export async function addNewRecipe(recipe: Recipe) {
  recipe.id = 'rec' + Date.now().toString()
  await setDoc(doc(firestore, 'recipes', recipe.id), recipe)
}

export async function removeRecipe(id: string) {
  await deleteDoc(doc(firestore, 'recipes', id))
}

export function filterRecipesbyCourse(recipes: Recipe[], value: Course) {
  return recipes.filter((recipe) => {
    return recipe.course === value
  })
}

export async function findRecipeById(id: string) {
  const docRef = doc(firestore, 'recipes', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { ...docSnap.data() }
  } else {
    console.log(`No document with id ${id}!`)
    return { id: '' }
  }
}

export async function editRecipe(id: string, newData: Recipe) {
  const recipeRef = doc(firestore, 'recipes', id)
  await setDoc(recipeRef, newData, { merge: true })
}
