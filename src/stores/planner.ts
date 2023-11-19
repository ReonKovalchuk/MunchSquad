import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { firestore } from '@/firebase/init'

import {
  doc,
  collection,
  setDoc,
  getDoc,
  query,
  where,
  and,
  or,
  getDocs,
  addDoc,
  onSnapshot,
  QuerySnapshot,
  CollectionReference
} from 'firebase/firestore'
import type { PlannerDay } from '@/types/types'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'
import { useFSRefsStore } from '@/stores/FSRefs'
import { readQuerySnapshot } from '@/functions'

export const usePlannerStore = defineStore('planner', () => {
  const planner = ref<PlannerDay[]>([])
  const loading = ref(false)
  const loaded = ref(false)
  const { userInfo } = storeToRefs(useUserInfoStore())
  const { colRefs } = storeToRefs(useFSRefsStore())

  async function getPlannerData() {
    console.log(colRefs.value.plannerColRef.path)
    loading.value = true

    const querySnapshot = await getDocs(colRefs.value.plannerColRef)
    planner.value = <PlannerDay[]>readQuerySnapshot(querySnapshot)
    loading.value = false
    loaded.value = true
    console.log('loaded planner', planner.value)
  }

  async function addNewPlannerDay(day: PlannerDay) {
    const docRef = doc(colRefs.value.plannerColRef, day.id)

    await setDoc(docRef, day)
  }

  function findPlannerDayById(id: string) {
    if (loaded.value) {
      console.log('planner has', planner.value)

      const res = planner.value.find((day) => {
        return day.id == id
      })
      console.log('found this', res)

      return res
    } else {
      return undefined
    }
  }

  async function editPlannerDay(newData: PlannerDay) {
    const res = findPlannerDayById(newData.id)
    if (res) {
      const docRef = doc(colRefs.value.plannerColRef, res.id)
      await setDoc(docRef, newData, { merge: true })
    } else {
      newData.uid = userInfo.value.uid
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
