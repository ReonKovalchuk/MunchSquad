import { ref } from 'vue'
import { useUserInfoStore } from './userInfo'
import { CollectionReference, collection } from 'firebase/firestore'
import { defineStore, storeToRefs } from 'pinia'
import { firestore } from '@/firebase/init'

export const useFSRefsStore = defineStore('FSRefs', () => {
  const colRefs = ref({
    plannerColRef: <CollectionReference>{},
    recipesColRef: <CollectionReference>{},
    restaurantsColRef: <CollectionReference>{}
  })
  function init() {
    const { userInfo } = storeToRefs(useUserInfoStore())
    const userCollection = userInfo.value.uid ? userInfo.value.uid : 'general'
    const plannerColRef = collection(firestore, 'users', userCollection, 'planner')

    const recipesColRef = collection(firestore, 'users', userCollection, 'recipes')

    const restaurantsColRef = collection(firestore, 'users', userCollection, 'restaurants')

    colRefs.value = {
      plannerColRef,
      recipesColRef,
      restaurantsColRef
    }
  }
  return {
    colRefs,
    init
  }
})
