import { type QuerySnapshot } from 'firebase/firestore'
import { DateTime } from 'luxon'
import type { Recipe, Restaurant, PlannerDay } from './types/types'
import { useSearchStore } from '@/stores/search'
import { useUserInfoStore } from '@/stores/userInfo'
import { useRecipesStore } from '@/stores/recipes'
import { useRestaurantsStore } from '@/stores/restaurants'
import { usePlannerStore } from '@/stores/planner'
import { useFSRefsStore } from './stores/FSRefs'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/init'
import { storeToRefs } from 'pinia'
import { onSnapshot } from '@firebase/firestore'

export function getTitle(day: DateTime) {
  return day.setLocale('ru').toLocaleString({ day: 'numeric', month: 'short', weekday: 'short' })
}
export function readQuerySnapshot(querySnapshot: QuerySnapshot) {
  const firestoreData = <any[]>[]
  querySnapshot.forEach((doc: any) => {
    // doc.data() is never undefined for query doc snapshots
    firestoreData.push({ id: doc.id, ...doc.data() })
  })
  return firestoreData
}

export function handleImgError(e: any) {
  e.target.src = '/placeholder-image.png'
}

export function isToday(day: DateTime) {
  return DateTime.now().startOf('day').toMillis() == day.toMillis()
}

export function isRecipe(id: string) {
  return id.includes('rec')
}

export function compareByName(a: Recipe | Restaurant, b: Recipe | Restaurant) {
  if (a.name && b.name) {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
  }
  return 0
}

export async function storesInit() {
  const userInfoStore = useUserInfoStore()
  const searchStore = useSearchStore()
  const recipesStore = useRecipesStore()
  const restaurantsStore = useRestaurantsStore()
  const plannerStore = usePlannerStore()
  const FSRefsStore = useFSRefsStore()

  onAuthStateChanged(auth, async (user) => {
    userInfoStore.init(user)
    if (user) {
      FSRefsStore.init()
      await recipesStore.getRecipes()
      await restaurantsStore.getRestaurants()
      await plannerStore.getPlannerData()
      searchStore.getSearchData()
      const { colRefs } = storeToRefs(FSRefsStore)
      const { planner } = storeToRefs(plannerStore)
      const { recipes } = storeToRefs(recipesStore)
      const { restaurants } = storeToRefs(restaurantsStore)
      onSnapshot(colRefs.value.plannerColRef, (querySnapshot: QuerySnapshot) => {
        planner.value = readQuerySnapshot(querySnapshot) as PlannerDay[]
        searchStore.getSearchData()
      })
      onSnapshot(colRefs.value.recipesColRef, (querySnapshot) => {
        recipes.value = readQuerySnapshot(querySnapshot) as Recipe[]
        searchStore.getSearchData()
      })
      onSnapshot(colRefs.value.restaurantsColRef, (querySnapshot) => {
        restaurants.value = readQuerySnapshot(querySnapshot) as Restaurant[]
        searchStore.getSearchData()
      })
    } else {
      recipesStore.$reset()
      restaurantsStore.$reset()
      plannerStore.$reset()
      searchStore.$reset()
    }
  })
}

export function settingsInit() {
  const showCarousel = localStorage.getItem('carousel')
  const showBreakfast = localStorage.getItem('breakfast')
  if (showCarousel == null) localStorage.setItem('carousel', 'true')
  if (showBreakfast == null) localStorage.setItem('breakfast', 'true')
}
