<script setup>
const { items } = defineProps(['items'])
</script>

<template>
  <ul class="search__list">
    <li
      v-for="item in items"
      :key="item.name"
      class="search__list-item"
      @mousedown="$emit('selected', item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<style></style>
