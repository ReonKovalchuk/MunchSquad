<script setup>
import { ref } from 'vue'
import AppHero from '@/components/AppHero.vue'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useFirebaseAuth } from 'vuefire'

const router = useRouter()
const userData = ref({ username: '', email: '', password: '' })
const errorMsg = ref('')
const auth = useFirebaseAuth()
const register = () => {
  createUserWithEmailAndPassword(auth, userData.value.email, userData.value.password)
    .then((user) => {
      updateProfile(auth.currentUser, {
        displayName: userData.value.username
      })
      router.push('/')
    })
    .catch((error) => {
      console.error('Registration error:', error)
      errorMsg.value = error.message
    })
}
</script>

<template>
  <app-hero></app-hero>
  <div class="container">
    <form action="" class="signup-login" @submit.prevent="register()" role="форма регистрации">
      <div class="input-group">
        <label for="username" class="input-label">Имя пользователя</label>
        <input
          type="text"
          id="username"
          class="input"
          minlength="2"
          maxlength="30"
          v-model="userData.username"
        />
      </div>
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
          placeholder="от 6 знаков"
          minlength="6"
          required
          v-model="userData.password"
        />
      </div>
      <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
      <button type="submit" class="btn btn-primary">Регистрация</button>
      <p>Уже есть аккаунт? <router-link to="/login" class="visible-link">Войти</router-link></p>
    </form>
  </div>
</template>
