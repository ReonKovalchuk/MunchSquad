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
  query,
  where
} from 'firebase/firestore'
import type { Restaurant } from '@/types/types'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'

const colRef = collection(firestore, 'restaurants')

export const useRestaurantsStore = defineStore('restaurants', () => {
  const restaurants = ref<Restaurant[]>([])
  const loading = ref(false)
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)

  async function getRestaurants() {
    loading.value = true
    const firestoreData = <Restaurant[]>[]
    const q = query(colRef, where('uid', '==', userInfo.value.uid))
    //const querySnapshot = await getDocs(collection(firestore, 'recipes'))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc: any) => {
      // doc.data() is never undefined for query doc snapshots
      firestoreData.push({ id: doc.id, ...doc.data() })
    })
    loading.value = false
    restaurants.value = firestoreData
  }

  async function addNewRestaurant(restaurant: Restaurant) {
    restaurant.id = 'res' + Date.now().toString()
    await setDoc(doc(firestore, 'restaurants', restaurant.id), restaurant)
  }

  async function removeRestaurant(id: string) {
    await deleteDoc(doc(firestore, 'restaurants', id))
  }

  async function findRestaurantById(id: string) {
    const docRef = doc(firestore, 'restaurants', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { ...docSnap.data() } as Restaurant
    } else {
      console.log(`No document with id ${id}!`)
      return { id: '', uid: userInfo.value.uid } as Restaurant
    }
  }

  async function editRestaurantInfo(id: string, newData: Restaurant) {
    const restaurantRef = doc(firestore, 'restaurants', id)
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
