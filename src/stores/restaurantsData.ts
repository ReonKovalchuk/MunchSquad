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

export async function getRestaurants() {
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)
  const firestoreData = <Restaurant[]>[]
  const q = query(colRef, where('uid', '==', userInfo.value.uid))
  //const querySnapshot = await getDocs(collection(firestore, 'recipes'))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc: any) => {
    // doc.data() is never undefined for query doc snapshots

    firestoreData.push({ id: doc.id, ...doc.data() })
  })
  return firestoreData
}

export async function addNewRestaurant(restaurant: Restaurant) {
  await setDoc(doc(firestore, 'restaurants', 'rec' + Date.now().toString()), restaurant)
}

export async function removeRestaurant(id: string) {
  await deleteDoc(doc(firestore, 'restaurants', id))
}

export async function findRestaurantById(id: string) {
  const docRef = doc(firestore, 'restaurants', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { ...docSnap.data() }
  } else {
    console.log(`No document with id ${id}!`)
    return { id: '' }
  }
}

export async function editRestaurantInfo(id: string, newData: Restaurant) {
  const restaurantRef = doc(firestore, 'restaurants', id)
  await setDoc(restaurantRef, newData, { merge: true })
}
