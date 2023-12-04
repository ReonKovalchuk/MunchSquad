<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
const { items } = defineProps(['items'])
</script>

<template>
  <ul class="search__list">
    <perfect-scrollbar>
      <li
        v-for="item in items"
        :key="item.name"
        class="search__list-item"
        @mousedown="$emit('selected', item)"
      >
        {{ item.name }}
      </li>
    </perfect-scrollbar>
  </ul>
</template>

<style scoped>
.ps {
  height: 111px;
  /* position: absolute;*/
  z-index: 101;
  /* width: 100%; */
}
</style>
