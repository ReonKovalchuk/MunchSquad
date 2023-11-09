<script setup>
import { useFirebaseAuth } from 'vuefire'
import { signOut } from 'firebase/auth'

const props = defineProps(['isLoggedIn'])
const auth = useFirebaseAuth()

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <button v-if="props.isLoggedIn" class="btn btn-primary" @click="handleSignOut()">Выйти</button>

  <router-link v-else to="/login" class="btn btn-primary">Войти</router-link>
</template>
