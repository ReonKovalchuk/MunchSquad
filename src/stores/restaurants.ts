import { ref } from 'vue'
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
import type { Restaurant } from '@/types/types'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'
import { readQuerySnapshot } from '@/functions'
import { useFSRefsStore } from './FSRefs'

export const useRestaurantsStore = defineStore('restaurants', () => {
  const restaurants = ref<Restaurant[]>([])
  const loading = ref(false)
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)
  const { colRefs } = storeToRefs(useFSRefsStore())
  // const restaurantsColRef = collection(
  //   firestore,
  //   'users',
  //   userInfo.value.uid ? userInfo.value.uid : 'general',
  //   'restaurants'
  // )
  async function getRestaurants() {
    loading.value = true

    // const firestoreData = <Restaurant[]>[]
    // const q = query(colRef, where('uid', '==', userInfo.value.uid))
    //const querySnapshot = await getDocs(collection(firestore, 'recipes'))
    const querySnapshot = await getDocs(colRefs.value.restaurantsColRef)

    // querySnapshot.forEach((doc: any) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   firestoreData.push({ id: doc.id, ...doc.data() })
    // })
    loading.value = false
    restaurants.value = <Restaurant[]>readQuerySnapshot(querySnapshot)
    console.log('restaurants now have', restaurants.value)
  }

  async function addNewRestaurant(restaurant: Restaurant) {
    restaurant.id = 'res' + Date.now().toString()
    await setDoc(doc(colRefs.value.restaurantsColRef, restaurant.id), restaurant)
  }

  async function removeRestaurant(id: string) {
    await deleteDoc(doc(colRefs.value.restaurantsColRef, id))
  }

  function findRestaurantById(id: string) {
    // const docRef = doc(colRefs.value.restaurantsColRef, id)
    // const docSnap = await getDoc(docRef)

    // if (docSnap.exists()) {
    //   return { ...docSnap.data() } as Restaurant
    // } else {
    //   console.log(`No document with id ${id}!`)
    //   return { id: '', uid: userInfo.value.uid } as Restaurant
    // }

    const res = restaurants.value.find((restaurant) => {
      return restaurant.id === id
    })
    return res ? res : ({ id: '', uid: userInfo.value.uid } as Restaurant)
  }

  async function editRestaurantInfo(id: string, newData: Restaurant) {
    const restaurantRef = doc(colRefs.value.restaurantsColRef, id)
    await setDoc(restaurantRef, newData, { merge: true })
  }

  return {
    restaurants,
    getRestaurants,
    addNewRestaurant,
    removeRestaurant,
    findRestaurantById,
    editRestaurantInfo
  }
})
