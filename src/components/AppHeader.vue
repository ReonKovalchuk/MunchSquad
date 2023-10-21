<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__logo-group">
        <img src="../assets/logo.svg" alt="" class="header__logo" /> Munch squad
      </div>
      <div class="header__nav-wrapper">
        <slot name="navigation"></slot>
      </div>
    </div>
  </header>
</template>
