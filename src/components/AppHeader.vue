<script setup>
import AppSearch from './AppSearch.vue'
import AppLogin from './AppLogin.vue'
import AppLogo from './AppLogo.vue'
</script>
<template>
  <header class="header">
    <div class="container header__container">
      <app-logo></app-logo>

      <div class="header__nav-wrapper">
        <slot name="navigation"></slot>
      </div>
      <app-search></app-search>
      <app-login></app-login>
    </div>
  </header>
</template>
