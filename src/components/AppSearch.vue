<script setup>
import { ref, computed } from 'vue'
import SearchIcon from './icons/SearchIcon.vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import SearchItems from './SearchItems.vue'

const searchStore = useSearchStore()

const { loading, searchData } = storeToRefs(searchStore)

const searchQuery = ref('')
const focus = ref(false)
const show = computed(() => {
  return searchedItems.value.length > 0 && searchQuery.value && focus
})
// const handleSearch = () => {}

const searchedItems = computed(() => {
  if (!loading.value) {
    const res = searchData.value.filter((item) => {
      return item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
    // return res.slice(0, 6)
    return res
  } else {
    return [{ name: 'Загрузка...' }]
  }
})
</script>

<template>
  <div class="search__wrapper" role="поиск">
    <div class="search__form" :class="{ 'search-active': show.value }">
      <input
        type="text"
        class="search__input"
        v-model="searchQuery"
        @focus="focus = true"
        @blur="focus = false"
        placeholder="Поиск"
      />
      <search-icon color="lightgray"></search-icon>
    </div>
    <search-items
      v-if="show.value"
      :items="searchedItems"
      @selected="(item) => $emit('selected', item)"
    ></search-items>
  </div>
</template>

<!-- <style scoped>
.search-active {
  border-radius: var(--border-radius-primary) var(--border-radius-primary) 0 0;
}
</style> -->
