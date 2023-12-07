<script setup></script>
<template>
  <div class="card card-placeholder">
    <img src="/Eclipse-1s-200px.gif" alt="идет загрузка" class="loader__img" />
  </div>
</template>
<style>
.loader__img {
  width: 100px;
  height: 100px;
  margin: auto;
}
.card-placeholder {
  min-width: 200px;
  min-height: 200px;
  flex-shrink: 0;
  flex-grow: 1;
}
</style>
