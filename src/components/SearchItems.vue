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

<style>
.search__list {
  position: absolute;
  top: 42px;
  z-index: 100;
  border-radius: 0 0 var(--border-radius-primary) var(--border-radius-primary);
  border: 1px solid var(--primary-color);
  padding: 0;
  margin: 0px;
  width: 100%;
  list-style: none;
  background-color: #fff;
  overflow: hidden;
}

.search__list-item {
  margin: 0;
  padding: 6px 18px;
  width: inherit;
}

.search__list-item:hover,
.search__list-item:focus {
  background-color: lightgray;
}

.search__list-item :not(:last-child) {
  border-bottom: var(--borde);
}
</style>
