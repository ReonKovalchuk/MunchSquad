import { ref } from 'vue'
import { defineStore } from 'pinia'

import { doc, setDoc, getDocs } from 'firebase/firestore'
import type { PlannerDay } from '@/types/types'
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userInfo'
import { useFSRefsStore } from '@/stores/FSRefs'
import { readQuerySnapshot } from '@/functions'

export const usePlannerStore = defineStore('planner', () => {
  const planner = ref<PlannerDay[]>([])
  const loading = ref(true)
  const loaded = ref(false)
  const { userInfo } = storeToRefs(useUserInfoStore())
  const { colRefs } = storeToRefs(useFSRefsStore())

  async function getPlannerData() {
    loading.value = true

    const querySnapshot = await getDocs(colRefs.value.plannerColRef)
    planner.value = <PlannerDay[]>readQuerySnapshot(querySnapshot)
    loading.value = false
    loaded.value = true
  }

  async function addNewPlannerDay(day: PlannerDay) {
    const docRef = doc(colRefs.value.plannerColRef, day.id)

    await setDoc(docRef, day)
  }

  function findPlannerDayById(id: string) {
    if (loaded.value) {
      const res = planner.value.find((day) => {
        return day.id == id
      })

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

  function $reset() {
    loading.value = false
    planner.value = []
  }
  return {
    planner,
    loading,
    getPlannerData,
    addNewPlannerDay,
    findPlannerDayById,
    editPlannerDay,
    $reset
  }
})
