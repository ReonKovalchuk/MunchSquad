<script setup>
import AppSearch from './AppSearch.vue'
import AppLogin from './AppLogin.vue'
const props = defineProps(['isLoggedIn'])
</script>
<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__logo-group">
        <img src="../assets/logo.svg" alt="" class="header__logo" /> Munch squad
      </div>
      <div class="header__nav-wrapper">
        <slot name="navigation"></slot>
      </div>
      <app-search></app-search>
      <app-login :is-logged-in="props.isLoggedIn"></app-login>
    </div>
  </header>
</template>
