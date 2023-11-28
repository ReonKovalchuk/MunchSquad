import { ref } from 'vue'
import { defineStore } from 'pinia'
// import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = ref({ isLoggedIn: false, displayName: '', uid: '' })
  function init(user: any) {
    if (user) {
      userInfo.value.isLoggedIn = true
      userInfo.value.displayName = user.displayName!
      userInfo.value.uid = user.uid
    } else {
      userInfo.value.isLoggedIn = false
      userInfo.value.displayName = ''
      userInfo.value.uid = ''
    }
  }
  return { userInfo, init }
})
