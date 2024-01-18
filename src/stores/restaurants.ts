import { ref } from 'vue'
import { defineStore } from 'pinia'
import { doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore'
import type { Restaurant } from '@/types/types'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'
import { readQuerySnapshot, compareByName } from '@/functions'
import { useFSRefsStore } from './FSRefs'

export const useRestaurantsStore = defineStore('restaurants', () => {
  const restaurants = ref<Restaurant[]>([])
  const loadingRes = ref(false)
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)
  const { colRefs } = storeToRefs(useFSRefsStore())

  async function getRestaurants() {
    loadingRes.value = true
    const querySnapshot = await getDocs(colRefs.value.restaurantsColRef)
    loadingRes.value = false
    restaurants.value = <Restaurant[]>readQuerySnapshot(querySnapshot)
    restaurants.value.sort(compareByName)
  }

  async function addNewRestaurant(restaurant: Restaurant) {
    restaurant.id = 'res' + Date.now().toString()
    await setDoc(doc(colRefs.value.restaurantsColRef, restaurant.id), restaurant)
  }

  async function removeRestaurant(id: string) {
    await deleteDoc(doc(colRefs.value.restaurantsColRef, id))
  }

  function findRestaurantById(id: string) {
    const res = restaurants.value.find((restaurant) => {
      return restaurant.id === id
    })
    return res ? res : ({ id: '', uid: userInfo.value.uid } as Restaurant)
  }

  async function editRestaurantInfo(id: string, newData: Restaurant) {
    const restaurantRef = doc(colRefs.value.restaurantsColRef, id)
    await setDoc(restaurantRef, newData, { merge: true })
  }
  function $reset() {
    loadingRes.value = false
    restaurants.value = []
  }

  return {
    loadingRes,
    restaurants,
    getRestaurants,
    addNewRestaurant,
    removeRestaurant,
    findRestaurantById,
    editRestaurantInfo,
    $reset
  }
})
