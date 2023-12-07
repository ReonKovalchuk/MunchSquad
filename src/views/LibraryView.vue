<script setup lang="ts">
import { ref } from 'vue'
import AppHero from '@/components/AppHero.vue'
import NewItem from '@/components/NewItem.vue'
import AppCard from '@/components/AppCard.vue'
import { useRecipesStore } from '@/stores/recipes'
import { storeToRefs } from 'pinia'
import { useRestaurantsStore } from '@/stores/restaurants'
import type { Recipe, Restaurant } from '@/types/types'

const { isRecipe, heroSubtitle } = defineProps(['isRecipe', 'heroSubtitle'])
const recFiltered = ref<Recipe[]>([])
const recipesStore = useRecipesStore()
const restaurantsStore = useRestaurantsStore()
const { recipes } = storeToRefs(recipesStore)
const { restaurants } = storeToRefs(restaurantsStore)
const { filterRecipesbyCourse, courseOptions } = recipesStore
const activeFilter = ref('Все')
if (isRecipe) {
  // const { recipes } = storeToRefs(recipesStore)

  // const { restaurants } = storeToRefs(restaurantsStore)
  recFiltered.value = recipes.value
}
const remove = (id: string) => {
  if (isRecipe) {
    recipesStore.removeRecipe(id)
  } else {
    restaurantsStore.removeRestaurant(id)
  }
  recFiltered.value = recFiltered.value.filter((i) => {
    return i.id !== id
  })
}
const filterRecipes = (course: string) => {
  recFiltered.value = filterRecipesbyCourse(course)
  activeFilter.value = course
}
const clearFilters = () => {
  recFiltered.value = recipes.value
  activeFilter.value = 'Все'
}
</script>

<template>
  <app-hero :subtitle="heroSubtitle" />
  <div class="container">
    <div v-if="isRecipe" class="tabs__container">
      <button
        type="button"
        class="btn course-btn"
        :сlass="{ 'active-filter': activeFilter }"
        @click="clearFilters"
      >
        Все
      </button>
      <button
        type="button"
        class="btn course-btn"
        v-for="option in courseOptions"
        :key="option"
        @click="filterRecipes(option)"
      >
        {{ option }}
      </button>
    </div>
    <div class="page__wrapper">
      <div class="page__main-content">
        <!-- v-for="item in isRecipe ? recipes : restaurants" -->
        <app-card
          v-for="item in isRecipe ? recFiltered : restaurants"
          :key="item.id"
          :object="item"
          :is-recipe="isRecipe"
          @remove="remove"
        ></app-card>
      </div>
      <aside class="new-x-form">
        <new-item :is-recipe="isRecipe"></new-item>
      </aside>
    </div>
  </div>
</template>

<style>
.course-btn {
  display: inline;
}
.active-filter {
}
</style>
