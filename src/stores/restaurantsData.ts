import { firestore } from '@/firebase/init'
import { doc, collection, setDoc, deleteDoc, getDocs, getDoc } from 'firebase/firestore'
import type { Restaurant } from '@/types/types'

export async function getRestaurants() {
  const firestoreData = <Restaurant[]>[]
  const querySnapshot = await getDocs(collection(firestore, 'restaurants'))
  querySnapshot.forEach((doc) => {
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
