import { firestore } from '@/firebase/init'

import { doc, collection, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore'
import type { PlannerDay } from '@/types/types'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'

const colRef = collection(firestore, 'planner')

export async function getPlannerData() {
  console.log('getting planner')
  const firestoreData = <PlannerDay[]>[]
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)
  const q = query(colRef, where('uid', '==', userInfo.value.uid))
  const querySnapshot = await getDocs(q)

  querySnapshot.forEach((doc: any) => {
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
