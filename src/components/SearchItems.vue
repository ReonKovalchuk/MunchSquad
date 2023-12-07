<script setup>
// import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
const { items } = defineProps(['items'])
</script>

<template>
  <ul class="search__list">
    <!-- <perfect-scrollbar> -->
    <li
      v-for="item in items"
      :key="item.name"
      class="search__list-item"
      @mousedown="$emit('selected', item)"
    >
      {{ item.name }}
    </li>
    <!-- </perfect-scrollbar> -->
  </ul>
</template>

<style scoped>
/* .ps {
  height: 111px;
  z-index: 101;
} */
.search__list {
  max-height: 111;
  overflow: scroll;
}
</style>
