<script setup>
import { useFirebaseAuth } from 'vuefire'
import { signOut } from 'firebase/auth'
import { useUserInfoStore } from '@/stores/userInfo'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useFirebaseAuth()
const userInfoStore = useUserInfoStore()
const { userInfo } = storeToRefs(userInfoStore)
function handleSignOut() {
  signOut(auth)
    .then(() => {
      router.push('/login')
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="login-group">
    <span v-if="userInfo.displayName" class="display-name">{{ userInfo.displayName }}</span>

    <button v-if="userInfo.isLoggedIn" class="btn btn-primary" @click="handleSignOut()">
      Выйти
    </button>

    <router-link v-else to="/login" class="btn btn-primary" tabindex="0">Войти</router-link>
  </div>
</template>

<style scoped>
.btn {
  display: inline;
}

.display-name {
  margin-right: 6px;
}
</style>
