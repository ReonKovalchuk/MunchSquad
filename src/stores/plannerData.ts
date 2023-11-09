import { firestore } from '@/firebase/init'
import { doc, collection, setDoc, getDocs, getDoc } from 'firebase/firestore'
import type { PlannerDay } from '@/types/types'

export async function getPlannerData() {
  const firestoreData = <PlannerDay[]>[]
  const querySnapshot = await getDocs(collection(firestore, 'planner'))
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    firestoreData.push({ id: doc.id, ...doc.data() })
  })
  return firestoreData
}

export async function addNewPlannerDay(day: PlannerDay) {
  const data = { dinnerId: day.dinnerId || '', supperId: day.supperId || '' }
  const docRef = doc(firestore, 'planner', day.id)
  await setDoc(docRef, data)
}

// export async function removeRecipe(id: string) {
//   await deleteDoc(doc(firestore, 'planner', id))
// }

export async function findPlannerDayById(id: string) {
  const docRef = doc(firestore, 'planner', id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return <PlannerDay>{ id, ...docSnap.data() }
  } else {
    return <PlannerDay>{ id }
  }
}

export async function editPlannerDay(newData: PlannerDay) {
  const docRef = doc(firestore, 'planner', newData.id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    await setDoc(docRef, newData, { merge: true })
  } else {
    await addNewPlannerDay(newData)
  }
}
