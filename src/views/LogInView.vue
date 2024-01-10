<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'

const router = useRouter()
const userData = ref({ email: '', password: '' })
const errorMsg = ref('')
const auth = useFirebaseAuth()
function register() {
  signInWithEmailAndPassword(auth, userData.value.email, userData.value.password)
    .then((user) => {
      router.push('/')
    })
    .catch((error) => {
      console.error(error.code)
      switch (error.code) {
        case 'auth/invalid-email':
          errorMsg.value = 'Некорректный e-mail'
          break

        case 'auth/user-not-found':
          errorMsg.value = 'Пользователь не найден'
          break

        case 'auth/wrong-password':
          errorMsg.value = 'Некорректный пароль'
          break

        default:
          errorMsg.value = 'Некорректный email или пароль'
          break
      }
    })
}
</script>

<template>
  <!-- <app-hero></app-hero> -->
  <div class="login-container">
    <form action="" class="signup-login" @submit.prevent="register()" role="форма авторизации">
      <div class="input-group">
        <label for="email" class="input-label">E-mail</label>
        <input
          type="email"
          class="input"
          id="email"
          placeholder="example@mail.com"
          required
          v-model="userData.email"
        />
      </div>
      <div class="input-group">
        <label for="password" class="input-label">Пароль</label>
        <input
          type="password"
          class="input"
          id="password"
          placeholder="6 знаков"
          minlength="6"
          required
          v-model="userData.password"
        />
      </div>
      <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
      <button type="submit" class="btn btn-primary">Вход</button>
      <p>
        Нет аккаунта?
        <router-link to="/signup" class="visible-link" tabindex="0">Регистрация</router-link>
      </p>
    </form>
  </div>
</template>
