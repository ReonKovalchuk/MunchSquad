import firestore from '@/firebase/init'
import { doc, collection, setDoc, deleteDoc, getDocs, getDoc } from 'firebase/firestore'
import type { Recipe, Course } from '@/types/types'
import { CourseEnum } from '@/types/types'

export async function getRecipes() {
  const firestoreData = <Recipe[]>[]
  const querySnapshot = await getDocs(collection(firestore, 'recipes'))
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    firestoreData.push({ id: doc.id, ...doc.data() })
  })
  return firestoreData
}

export const getCourceOptions = () => {
  return Object.keys(CourseEnum).filter((v) => isNaN(Number(v)))
}

export async function addNewRecipe(recipe: Recipe) {
  await setDoc(doc(firestore, 'recipes', 'rec' + Date.now().toString()), recipe)
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
    return { id, ...docSnap.data() }
  } else {
    console.log('No such document!')
    return {}
  }
}

export async function editRecipe(id: string, newData: Recipe) {
  const recipeRef = doc(firestore, 'recipes', id)
  await setDoc(recipeRef, newData, { merge: true })
}
