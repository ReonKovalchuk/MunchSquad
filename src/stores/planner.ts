import { ref } from 'vue'
import { defineStore } from 'pinia'
import { firestore } from '@/firebase/init'

import { doc, collection, setDoc, getDoc, query, where, getDocs } from 'firebase/firestore'
import type { PlannerDay } from '@/types/types'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'

const colRef = collection(firestore, 'planner')

export const usePlannerStore = defineStore('planner', () => {
  const planner = ref<PlannerDay[]>([])
  const loading = ref(false)
  const userInfoStore = useUserInfoStore()
  const { userInfo } = storeToRefs(userInfoStore)

  async function getPlannerData() {
    loading.value = true
    const firestoreData = <PlannerDay[]>[]
    const q = query(colRef, where('uid', '==', userInfo.value.uid))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc: any) => {
      // doc.data() is never undefined for query doc snapshots
      firestoreData.push({ id: doc.id, ...doc.data() })
    })
    planner.value = firestoreData
    loading.value = false
  }

  async function addNewPlannerDay(day: PlannerDay) {
    const data = { dinnerId: day.dinnerId || '', supperId: day.supperId || '' }
    const docRef = doc(firestore, 'planner', day.id)
    await setDoc(docRef, data)
  }

  async function findPlannerDayById(id: string) {
    const docRef = doc(firestore, 'planner', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return <PlannerDay>{ id, ...docSnap.data() }
    } else {
      return <PlannerDay>{ id, uid: userInfo.value.uid }
    }
  }

  async function editPlannerDay(newData: PlannerDay) {
    const docRef = doc(firestore, 'planner', newData.id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      await setDoc(docRef, newData, { merge: true })
    } else {
      await addNewPlannerDay(newData)
    }
  }
  return {
    planner,
    loading,
    getPlannerData,
    addNewPlannerDay,
    findPlannerDayById,
    editPlannerDay
  }
})
